import { IEditorFile, IEditorLanguagePlugin, Monaco } from '@agorapp/editor-common';
import { configure } from 'motoko/contrib/monaco';
import mo from 'motoko/lib/versions/interpreter';
import motokoBasePackage from 'motoko/packages/latest/base.json';

export class MotokoEditorPlugin implements IEditorLanguagePlugin {
  language = 'motoko';

  fileExtensions = ['mo'];

  init(monaco: Monaco): void {
    configure(monaco);
  }

  async run(files: IEditorFile[]): Promise<string> {
    mo.clearPackages();
    mo.loadPackage(motokoBasePackage);

    for (const file of files) {
      mo.write(file.path, file.content);
    }

    const mainFile = files.find(file => file.path === 'main.mo') || files[0];
    const res = mo.run(mainFile.path);

    return res.stdout + res.stderr;
  }
}
