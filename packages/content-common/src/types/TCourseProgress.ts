import { TLesson } from './course';

export type TCourseProgress = { [lessonSlug: string]: TLessonProgress };

export type TLessonProgress = {
  status: string;
};
