import { courseService } from '@/app/(editor)/editor2/services/courseService';
import { EditorProvider } from '@/app/context/EditorContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { muiDarkTheme, theme } from '@/app/styles/themes';
import { EditorPageClient } from '@/app/(editor)/editor2/[courseSlug]/[...lessonSlugs]/page.client';
import fs from 'fs/promises';
import findLessonRecursively from '@/app/utils/findLesson';

type EditorPageProps = {
  params: {
    courseSlug: string;
    lessonSlugs: string[];
  };
};

export default async function EditorPage({ params }: EditorPageProps) {
  console.debug('EDITOR PAGE PARAMS', params);
  const course = await courseService.fetchCourse(params.courseSlug);

  const lesson = findLessonRecursively(
    course.lessons,
    params.lessonSlugs[params.lessonSlugs.length - 1],
  );
  const content = await fs.readFile('./public' + lesson.content[0].markdown, 'utf-8');

  return (
    <EditorProvider course={course} content={content}>
      <EditorPageClient />
    </EditorProvider>
  );
}
