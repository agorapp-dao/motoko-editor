export interface TLessonContent {
  tab: string;
  markdown: string;
}

export interface TLessonFile {
  path: string;
  language: string;
}

export interface TLesson {
  name: string;
  slug: string;

  children?: TLesson[];

  content?: TLessonContent[];
  files?: TLessonFile[];
}

// main.mo, "code asdsadsa", type: ""
