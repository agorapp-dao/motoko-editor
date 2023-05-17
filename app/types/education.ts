
export interface TLessonContent {
  tab: string;
  text: string;
  slug: string;
}


export interface TLesson {
  name: string;
  content?: TLessonContent[];
  children?: TLesson[];
};
