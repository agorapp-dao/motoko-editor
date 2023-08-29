import { TEditorFile, IEditorPlugin, Monaco } from '@agorapp-dao/editor-common';
import { configure } from 'motoko/contrib/monaco';
import mo from 'motoko/lib/versions/moc';
import motokoBasePackage from 'motoko/packages/latest/base.json';
import { editor, MarkerSeverity } from 'monaco-editor';
import IMarkerData = editor.IMarkerData;
import { completion } from './completion';
import pkg from '../package.json';
import { TTestResponse } from '@agorapp-dao/editor-common/src/types/TTestResponse';
import { formatting } from './formatting';

mo.setRunStepLimit(100_000);

export default class MotokoEditorPlugin implements IEditorPlugin {
  name = pkg.name;

  fileExtensions = {
    mo: 'motoko',
  };

  private monaco: Monaco | undefined;

  async init(monaco: Monaco) {
    this.monaco = monaco;
    configure(monaco, { snippets: false });

    completion(this.monaco, mo);
    formatting(this.monaco);
  }

  async run(
    courseSlug: string,
    lessonSlug: string | undefined,
    files: TEditorFile[],
  ): Promise<string> {
    mo.clearPackages();
    mo.loadPackage(motokoBasePackage);

    for (const file of files) {
      mo.write(file.path, file.content);
    }

    const mainFile = files.find(file => file.path === 'main.mo') || files[0];
    const res = mo.run(mainFile.path);

    return res.stdout + res.stderr;
  }

  test(
    courseSlug: string,
    lessonSlug: string | undefined,
    files: TEditorFile[],
  ): Promise<TTestResponse> {
    throw new Error(`Not supported`);
  }

  async check(filePath: string, files: TEditorFile[]): Promise<void> {
    const monaco = this.monaco;
    if (!monaco) {
      return;
    }

    mo.clearPackages();
    mo.loadPackage(motokoBasePackage);

    for (const file of files) {
      mo.write(file.path, file.content);
    }

    const problems = mo.check(filePath);

    // get model of the current editor
    const model = monaco.editor.getModels()[0];
    if (!model) {
      throw new Error(`Failed to get editor model`);
    }

    const getSeverity = (severity: string): MarkerSeverity => {
      let s = parseInt(severity);
      if (Number.isNaN(s)) {
        throw new Error(`[editor-plugin-motoko] Invalid severity: ${severity}`);
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
          throw new Error(`[editor-plugin-motoko] Invalid severity: ${severity}`);
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
