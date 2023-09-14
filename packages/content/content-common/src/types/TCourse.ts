import { ETopic } from './ETopic';

export type TCourseType = 'course' | 'challenge' | 'tutorial';

export type TCourse = {
  topic: ETopic;
  slug: string;
  name: string;
  description: string;
  type: TCourseType;
  plugin: string;

  config: TCourseConfig;

  lessons: TLesson[];
};

export type TLesson = {
  name: string;
  slug?: string; // slug is optional for challenges, where there is only 1 lesson

  children?: TLesson[];

  content?: string;
  files?: string[];
  solution?: string;
  hints?: string[];

  /**
   * When set, this file will be active by default when switching to the lesson.
   */
  defaultFile?: string;

  /**
   * Computed property. Frontend will calculate this.
   */
  $lessonNumber?: string;
};

export type TCourseConfig = {
  output?: boolean;
  tests?: boolean;
  enableLessonsWithProgress?: boolean;
};
