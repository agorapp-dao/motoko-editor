export type TEditorConfig = {
  topOffset?: number;
  enableLessonsWithProgress?: boolean;
  authenticated?: boolean;
  onLessonComplete?: (
    lessonNumber: string | undefined,
    isPrevLesson: boolean,
    isNextLesson: boolean,
  ) => Promise<void>;
};
