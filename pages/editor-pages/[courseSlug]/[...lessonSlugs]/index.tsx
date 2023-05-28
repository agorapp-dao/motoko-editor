import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { courseService } from '@/app/(editor)/editor2/services/courseService';
import { TCourse } from '@/app/types/education';
import fs from 'fs/promises';
import findLessonRecursively from '@/app/utils/findLesson';
import { muiDarkTheme, theme } from '@/app/styles/themes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import * as S from '@/app/styles/global.styled';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Editor from '@/app/Editor/Editor';
import { EditorProvider } from '@/app/context/EditorContext';

type TEditorPageProps = {
  course: TCourse;
  content: string;
};

export default function EditorPage({ course, content }: TEditorPageProps) {
  return (
    <EditorProvider course={course} content={content}>
      <MuiThemeProvider theme={muiDarkTheme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <S.Main>
            <Editor />
          </S.Main>
        </ThemeProvider>
      </MuiThemeProvider>
    </EditorProvider>
  );
}

type TEditorPageParams = {
  courseSlug: string;
  lessonSlugs: string[];
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<TEditorPageParams>,
): Promise<GetServerSidePropsResult<TEditorPageProps>> {
  if (!ctx.params) {
    throw new Error('todo');
  }

  const course = await courseService.fetchCourse(ctx.params.courseSlug);
  const lesson = findLessonRecursively(
    course.lessons,
    ctx.params.lessonSlugs[ctx.params.lessonSlugs.length - 1],
  );
  const content = await fs.readFile('./public' + lesson.content[0].markdown, 'utf-8');
  return { props: { course, content } };
}
