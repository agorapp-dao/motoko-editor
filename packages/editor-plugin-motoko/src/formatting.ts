import { Monaco } from '@agorapp-dao/editor-common';
import type { languages } from 'monaco-editor';
import { format } from 'prettier/standalone';
import * as motokoPlugin from 'prettier-plugin-motoko/lib/environments/web';

export function formatting(monaco: Monaco) {
  // define a document formatting provider
  // then you contextmenu will add an "Format Document" action
  monaco.languages.registerDocumentFormattingEditProvider('motoko', {
    async provideDocumentFormattingEdits(model, options) {
      let formatted = await formatCode(model.getValue(), options);
      return [
        {
          range: model.getFullModelRange(),
          text: formatted,
        },
      ];
    },
  });

  monaco.languages.registerDocumentRangeFormattingEditProvider('motoko', {
    async provideDocumentRangeFormattingEdits(model, range, options) {
      let formatted = await formatCode(model.getValue(), options);
      return [
        {
          range: range,
          text: formatted,
        },
      ];
    },
  });
}

export async function formatCode(
  code: string,
  options: languages.FormattingOptions,
): Promise<string> {
  const formatted = await format(code, {
    plugins: [motokoPlugin],
    filepath: 'Main.mo',
    tabWidth: options.tabSize,
    useTabs: !options.insertSpaces,
  });
  return formatted;
}
