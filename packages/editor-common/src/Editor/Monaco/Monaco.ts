// it is important to not import monaco-editor directly, otherwise it fails with navigator not defined on the server
import type TMonaco from 'monaco-editor';
import { IEditorLanguagePlugin } from '../../types/IEditorLanguagePlugin';
let monaco: Promise<typeof TMonaco>;

const languagePlugins: { [key: string]: IEditorLanguagePlugin } = {};

export function registerLanguagePlugin(plugin: IEditorLanguagePlugin) {
  languagePlugins[plugin.language] = plugin;
}

export function getLanguagePlugin(language: string) {
  if (!languagePlugins[language]) {
    throw new Error(`Language plugin for ${language} not found`);
  }
  return languagePlugins[language];
}

export async function getMonaco() {
  if (!monaco) {
    monaco = import('monaco-editor').then(monaco => {
      for (const plugin of Object.values(languagePlugins)) {
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
