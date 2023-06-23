export interface TLesson {
  name: string;
  slug: string;

  children?: TLesson[];

  content?: string;
  files?: string[];
  solution?: string;
  hints?: string[];
}

export interface TCourse {
  name: string;
  slug: string;

  lessons: TLesson[];
}
