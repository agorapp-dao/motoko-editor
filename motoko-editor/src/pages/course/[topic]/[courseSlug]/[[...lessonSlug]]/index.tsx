import { SWRConfig } from 'swr';
import * as S from '@/src/styles/global.styled';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { courseService, Editor, editorService } from '@agorapp-dao/editor-common';
import { contentService } from '@agorapp-dao/content-common';
import { ETopic, parseTopic } from '@agorapp-dao/content-common/src/types/ETopic';
import { EColorMode } from '@agorapp-dao/react-common/src/types/misc';

type TEditorPageProps = {
  topic: ETopic;
  lessonSlug: string;
  courseSlug: string;
  fallback: { [key: string]: any };
};

courseService.baseUrl = '/course';

editorService.pluginLoader = async (pluginName: string) => {
  let pluginModule;
  switch (pluginName) {
    case '@agorapp-dao/editor-plugin-motoko':
      pluginModule = await import('@agorapp-dao/editor-plugin-motoko');
      break;

    default:
      throw new Error(`Plugin ${pluginName} not found`);
  }
  return pluginModule.default;
};

export default function EditorPage({ topic, courseSlug, lessonSlug, fallback }: TEditorPageProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <S.Main>
        <Editor
          topic={topic}
          courseSlug={courseSlug}
          activeLessonSlug={lessonSlug}
          colorMode={EColorMode.light}
        />
      </S.Main>
    </SWRConfig>
  );
}

type TEditorPageParams = {
  topic: string;
  courseSlug: string;
  lessonSlug: string[];
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<TEditorPageParams>,
): Promise<GetServerSidePropsResult<TEditorPageProps>> {
  if (!ctx.params) {
    throw new Error('No params provided');
  }

  const topic = parseTopic(ctx.params.topic);
  const { courseSlug } = ctx.params;

  const fallback: { [key: string]: any } = {};

  const course = await contentService.getCourseFromFile(topic, courseSlug);
  if (!course) {
    throw new Error(`Course ${courseSlug} not found`);
  }
  const courseJsonPath = courseService.getContentPath(course, 'course.json');
  if (!courseJsonPath) {
    throw new Error(`Course ${courseSlug}: course.json not found`);
  }
  fallback[courseJsonPath] = course;

  let lessonSlug = ctx.params.lessonSlug?.length ? ctx.params.lessonSlug[0] : undefined;
  if (!lessonSlug) {
    const firstLesson = courseService.findLesson(course, lesson => !!lesson.content);
    if (!firstLesson) {
      throw new Error(`Course ${course.slug}: no lesson with content found`);
    }
    return {
      redirect: {
        permanent: false,
        destination: courseService.getCoursePath(course, firstLesson.slug),
      },
    };
  }

  const lesson = courseService.findLessonBySlug(course, lessonSlug);
  if (lesson?.content) {
    const contentPath = courseService.getContentPath(course, lesson.content);
    if (contentPath) {
      fallback[contentPath] = await contentService.getContentFromFile(course, lesson.content);
    }
  }

  return {
    props: { topic, courseSlug: ctx.params.courseSlug, lessonSlug, fallback },
  };
}
