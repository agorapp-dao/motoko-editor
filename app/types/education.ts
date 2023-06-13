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

// main.mo, "code asdsadsa", type: ""

export enum EChains {
  ICP = "icp",
}

export type TWalletIdentity  = {
  address: string | undefined;
  chain: EChains | undefined;
}