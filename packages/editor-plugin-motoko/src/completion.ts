import { CancellationToken, editor, languages, type Position } from 'monaco-editor';
import { Monaco } from '@agorapp-dao/editor-common';
import Mo from 'motoko/lib/versions/moc';
import { keywords } from 'motoko/lib/keywords';
import { typeKeywords } from 'motoko/lib/keywords';
import { CompletionService } from './completion/CompletionService';
import { ProgramSymbol } from './completion/Program';

export function completion(monaco: Monaco, mo: typeof Mo) {
  monaco.languages.registerCompletionItemProvider('motoko', new CompletionItemProvider(monaco, mo));
}

export class CompletionItemProvider implements languages.CompletionItemProvider {
  triggerCharacters = ['.'];

  private completionService;

  constructor(
    private monaco: Monaco,
    private mo: typeof Mo,
  ) {
    this.completionService = new CompletionService(mo);
    // TODO: preload all modules?
    // this.completionService.addBaseLibrary();
    this.completionService.addBaseModule('mo:base/Debug');
    this.completionService.addBaseModule('mo:base/Nat');
    this.completionService.addBaseModule('mo:base/Nat8');
    this.completionService.addBaseModule('mo:base/Float');
    this.completionService.addBaseModule('mo:base/Text');
    this.completionService.addBaseModule('mo:base/Buffer');
    this.completionService.addBaseModule('mo:base/Option');
    this.completionService.addBaseModule('mo:base/Result');
    this.completionService.addBaseModule('mo:base/Time');
    this.completionService.addBaseModule('mo:base/Principal');
  }

  provideCompletionItems(
    model: editor.ITextModel,
    position: Position,
    context: languages.CompletionContext,
    token: CancellationToken,
  ): languages.ProviderResult<languages.CompletionList> {
    const { monaco, mo } = this;

    const models = monaco.editor.getModels();
    for (const model of models) {
      try {
        this.completionService.addModule(model.uri.path, model.getValue());
      } catch (err) {
        // ignore parsing error
      }
    }

    let suggestions: languages.CompletionItem[] = [];

    var word = model.getWordUntilPosition(position);
    var range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    const dot = model.findPreviousMatch('.', position, false, false, null, false);
    const isAfterDot =
      dot?.range?.startLineNumber === position.lineNumber &&
      dot.range.endColumn === word.startColumn;

    if (!isAfterDot) {
      // suggest keywords
      suggestions = keywords.map(keyword => ({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword + ' ',
        range: range,
      }));

      suggestions = suggestions.concat(
        typeKeywords.map(typeKeyword => ({
          label: typeKeyword,
          kind: monaco.languages.CompletionItemKind.Constructor,
          insertText: typeKeyword,
          range: range,
        })),
      );
    }

    let symbols: ProgramSymbol[];

    if (!isAfterDot) {
      symbols = this.completionService.getSymbols(
        model.uri.path,
        position.lineNumber,
        position.column,
      );
    } else {
      const wordBeforeDot = model.getWordUntilPosition({
        lineNumber: dot.range.startLineNumber,
        column: dot.range.startColumn,
      }).word;
      symbols = this.completionService.getObjectSymbols(
        model.uri.path,
        wordBeforeDot,
        position.lineNumber,
        position.column,
      );
    }

    for (const symbol of symbols) {
      switch (symbol.kind) {
        case 'variable':
          suggestions.push({
            label: symbol.name,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: symbol.name,
            range,
          });
          break;
        case 'function':
          suggestions.push({
            label: symbol.name,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: symbol.name + '($1)',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          });
          break;
        case 'class':
          suggestions.push({
            label: symbol.name,
            kind: monaco.languages.CompletionItemKind.Constructor,
            insertText: symbol.name + '($1)',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          });
          break;
        case 'object':
          suggestions.push({
            label: symbol.name,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: symbol.name,
            range,
          });
          break;
        case 'actor':
          suggestions.push({
            label: symbol.name,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: symbol.name,
            range,
          });
          break;
        case 'module':
          suggestions.push({
            label: symbol.name,
            kind: monaco.languages.CompletionItemKind.Module,
            insertText: symbol.name,
            range,
          });
          break;
        default:
          throw new Error(`Unknown symbol kind: ${symbol.kind}`);
      }
    }

    return { suggestions: suggestions };
  }
}
