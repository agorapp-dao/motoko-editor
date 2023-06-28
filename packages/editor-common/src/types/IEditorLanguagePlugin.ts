import { IEditorFile, Monaco } from '../index';

export interface IEditorLanguagePlugin {
  language: string;

  fileExtensions: string[];

  init(monaco: Monaco): void;

  /**
   * Executes the provided files and returns the program output.
   * @param files
   */
  run(files: IEditorFile[]): Promise<string>;

  check(file: IEditorFile, files: IEditorFile[]): Promise<void>;
}
