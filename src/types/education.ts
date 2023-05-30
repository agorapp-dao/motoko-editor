export interface TLessonContent {
  tab: string;
  markdown: string;
}

export interface TLessonFile {
  path: string;
  language: string;
}

export interface TLessonHint {
  markdown: string;
}

export interface TLesson {
  name: string;
  slug: string;

  children?: TLesson[];

  content?: TLessonContent[];
  files?: TLessonFile[];
  solution?: TLessonHint;
  hints?: TLessonHint[];
}

export interface TCourse {
  name: string;
  slug: string;

  lessons: TLesson[];
}
