
export interface TLessonContent {
  tab: string;
  markdown: string;
}


export interface TLesson {
  name: string;
  slug: string;
  content?: TLessonContent[];
  children?: TLesson[];
};


// main.mo, "code asdsadsa", type: ""
