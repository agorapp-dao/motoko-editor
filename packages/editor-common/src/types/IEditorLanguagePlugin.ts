import { IEditorFile, Monaco } from '../index';

export interface IEditorLanguagePlugin {
  language: string;

  init(monaco: Monaco): void;

  /**
   * Executes the provided files and returns the program output.
   * @param files
   */
  run(files: IEditorFile[]): Promise<string>;
}
