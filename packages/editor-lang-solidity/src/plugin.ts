import { IEditorFile, IEditorLanguagePlugin, Monaco } from '@agorapp/editor-common';

export class SolidityEditorPlugin implements IEditorLanguagePlugin {
  language = 'sol';

  fileExtensions = ['sol'];

  init(monaco: Monaco): void {}

  async check(filePath: string, files: IEditorFile[]): Promise<void> {
    // do nothing
  }

  async run(files: IEditorFile[]): Promise<string> {
    return 'todo';
  }
}
