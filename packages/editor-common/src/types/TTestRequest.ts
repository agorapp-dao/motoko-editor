import { TEditorFile } from './TEditorFile';

export type TTestRequest = {
  runner: string;
  image?: string;
  courseSlug: string;
  lessonSlug?: string;
  files: TEditorFile[];
};
