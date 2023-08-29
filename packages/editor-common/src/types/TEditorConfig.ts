export type TEditorConfig = {
  topOffset?: number;
  enableLessonsWithProgress?: boolean;
  authenticated?: boolean;
  onLessonComplete?: (lessonNumber: string) => Promise<void>;
};
