export type TCourse = {
  name: string;
  slug: string;
  plugin: string;

  config: TCourseConfig;

  lessons: TLesson[];
};

export type TLesson = {
  name: string;
  slug: string;

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
