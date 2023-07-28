import * as S from '@/src/styles/global.styled';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { courseService, Editor, editorService } from '@agorapp-dao/editor-common';
import { contentService } from '@agorapp-dao/content-common';
import { MotokoEditorPlugin } from '@agorapp-dao/editor-lang-motoko';
import { SWRConfig } from 'swr';

type TEditorPageProps = {
  lessonSlug: string;
  courseSlug: string;
  fallback: { [key: string]: any };
};

editorService.registerLanguagePlugin(new MotokoEditorPlugin());

export default function EditorPage({ courseSlug, lessonSlug, fallback }: TEditorPageProps) {
  const [activeLessonSlug, setActiveLessonSlug] = useState(lessonSlug);
  const router = useRouter();

  useEffect(() => {
    const slug = router.query.lessonSlug ? router.query.lessonSlug[0] : '';
    setActiveLessonSlug(slug);
  }, [router.query.lessonSlug]);

  return (
    <SWRConfig value={{ fallback }}>
      <S.Main>
        <Editor
          courseSlug={courseSlug}
          activeLessonSlug={activeLessonSlug}
          setActiveLessonSlug={setActiveLessonSlug}
        />
      </S.Main>
    </SWRConfig>
  );
}

type TEditorPageParams = {
  courseSlug: string;
  lessonSlug: string[];
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<TEditorPageParams>,
): Promise<GetServerSidePropsResult<TEditorPageProps>> {
  if (!ctx.params) {
    throw new Error('No params provided');
  }

  const { courseSlug } = ctx.params;

  const fallback: { [key: string]: any } = {};

  const course = await contentService.getCourse(courseSlug);
  if (!course) {
    throw new Error(`Course ${courseSlug} not found`);
  }
  fallback[`/api/course/${courseSlug}`] = course;

  let lessonSlug = ctx.params.lessonSlug?.length ? ctx.params.lessonSlug[0] : undefined;
  if (!lessonSlug) {
    const firstLesson = courseService.findLesson(course, lesson => !!lesson.content);
    if (!firstLesson) {
      throw new Error(`Course ${course.slug}: no lesson with content found`);
    }
    return {
      redirect: {
        permanent: false,
        destination: courseService.getCoursePath(courseSlug, firstLesson.slug),
      },
    };
  }

  const lesson = courseService.findLessonBySlug(course, lessonSlug);
  if (lesson?.content) {
    const contentPath = courseService.getContentPath(course, lesson.content);
    if (contentPath) {
      fallback[contentPath] = await contentService.getContent(course, lesson.content);
    }
  }

  return {
    props: { courseSlug: ctx.params.courseSlug, lessonSlug, fallback },
  };
}
