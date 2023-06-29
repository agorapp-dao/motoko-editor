import { IEditorFile, IEditorLanguagePlugin, Monaco } from '@agorapp/editor-common';
import { configure } from 'motoko/contrib/monaco';
import mo from 'motoko/lib/versions/moc';
import motokoBasePackage from 'motoko/packages/latest/base.json';
import { editor, MarkerSeverity } from 'monaco-editor';
import IMarkerData = editor.IMarkerData;
import { completion } from './completion';

mo.setRunStepLimit(100_000);

export class MotokoEditorPlugin implements IEditorLanguagePlugin {
  language = 'motoko';

  fileExtensions = ['mo'];

  private monaco: Monaco | undefined;

  init(monaco: Monaco): void {
    this.monaco = monaco;
    configure(monaco, { snippets: false });

    completion(this.monaco, mo);
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

  async check(file: IEditorFile, files: IEditorFile[]): Promise<void> {
    const monaco = this.monaco;
    if (!monaco) {
      return;
    }

    mo.clearPackages();
    mo.loadPackage(motokoBasePackage);

    for (const file of files) {
      mo.write(file.path, file.content);
    }

    const problems = mo.check(file.path);

    // get model of the current editor
    const model = monaco.editor.getModels()[0];
    if (!model) {
      throw new Error(`Failed to get editor model`);
    }

    const getSeverity = (severity: string): MarkerSeverity => {
      let s = parseInt(severity);
      if (Number.isNaN(s)) {
        throw new Error(`[editor-lang-motoko] Invalid severity: ${severity}`);
      }

      // from vscode-languageserver-types, DiagnosticSeverity
      switch (s) {
        case 1:
          return monaco.MarkerSeverity.Error;
        case 2:
          return monaco.MarkerSeverity.Warning;
        case 3:
          return monaco.MarkerSeverity.Info;
        case 4:
          return monaco.MarkerSeverity.Hint;
        default:
          throw new Error(`[editor-lang-motoko] Invalid severity: ${severity}`);
      }
    };

    const markers: IMarkerData[] = [];
    for (const problem of problems) {
      markers.push({
        message: problem.message,
        severity: getSeverity(problem.severity),
        startLineNumber: problem.range.start.line + 1,
        startColumn: problem.range.start.character + 1,
        endLineNumber: problem.range.end.line + 1,
        endColumn: problem.range.end.character + 1,
      });
    }

    this.monaco?.editor.setModelMarkers(model, 'owner', markers);
  }
}
