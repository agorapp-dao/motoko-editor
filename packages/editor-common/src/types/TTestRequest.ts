import { TEditorFile } from './TEditorFile';

export type TTestRequest = {
  runner: string;
  courseSlug: string;
  lessonSlug?: string;

  files: TEditorFile[];

  // docker-runner args
  image?: string;
};
