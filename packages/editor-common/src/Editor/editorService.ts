import { IEditorLanguagePlugin } from '../types/IEditorLanguagePlugin';
import { IEditorFile } from '../types/IEditorFile';

class EditorService {
  private languagePlugins: { [key: string]: IEditorLanguagePlugin } = {};

  /**
   * Maps file extensions to lang plugins that handle them.
   * @private
   */
  private fileExtensions: { [key: string]: string } = {};

  registerLanguagePlugin(plugin: IEditorLanguagePlugin) {
    this.languagePlugins[plugin.language] = plugin;

    for (const fileExtension of plugin.fileExtensions) {
      this.fileExtensions[fileExtension] = plugin.language;
    }
  }

  getLanguagePlugin(language: string) {
    if (!this.languagePlugins[language]) {
      throw new Error(`Language plugin for ${language} not found`);
    }
    return this.languagePlugins[language];
  }

  getLanguagePlugins(): IEditorLanguagePlugin[] {
    return Object.values(this.languagePlugins);
  }

  getLanguageForFile(filePath: string): string {
    const fileExtension = filePath.split('.').pop();
    return fileExtension ? this.fileExtensions[fileExtension] : 'text/plain';
  }

  async run(language: string, files: IEditorFile[]): Promise<string> {
    const plugin = editorService.getLanguagePlugin(language);
    const output = await plugin.run(files);
    return output;
  }

  async check(file: IEditorFile, files: IEditorFile[]): Promise<void> {
    const language = this.getLanguageForFile(file.path);
    if (!language) {
      return;
    }

    const plugin = editorService.getLanguagePlugin(language);
    await plugin.check(file, files);
  }
}

export const editorService = new EditorService();
