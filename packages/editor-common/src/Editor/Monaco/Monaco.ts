// it is important to not import monaco-editor directly, otherwise it fails with navigator not defined on the server
import type TMonaco from 'monaco-editor';
import { editorService } from '../editorService';
let monaco: Promise<typeof TMonaco>;

export async function getMonaco() {
  if (!monaco) {
    monaco = import('monaco-editor').then(monaco => {
      for (const plugin of editorService.getLanguagePlugins()) {
        plugin.init(monaco);
      }
      return monaco;
    });
  }

  return monaco;
}

export async function monacoDefineTheme(themeData: TMonaco.editor.IStandaloneThemeData) {
  if (typeof window === 'undefined') {
    // do nothing on server-side
    return;
  }

  const monaco = await getMonaco();
  monaco.editor.defineTheme('editorTheme', themeData);
}
