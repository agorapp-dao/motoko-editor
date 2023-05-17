
export interface TLessonContent {
  tab: string;
  text: string;
}


export interface TLesson {
  name: string;
  slug: string;
  content?: TLessonContent[];
  children?: TLesson[];
};
