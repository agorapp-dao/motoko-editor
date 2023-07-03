import { CancellationToken, editor, languages, type Position } from 'monaco-editor';
import { Monaco } from '@agorapp/editor-common';
import Mo from 'motoko/lib/versions/moc';
import { keywords } from 'motoko/lib/keywords';
import { typeKeywords } from 'motoko/src/keywords';
import { Node } from 'motoko/src/ast';
import { CompletionTree } from './CompletionTree';

export function completion(monaco: Monaco, mo: typeof Mo) {
  monaco.languages.registerCompletionItemProvider('motoko', new CompletionItemProvider(monaco, mo));
}

export class CompletionItemProvider implements languages.CompletionItemProvider {
  constructor(private monaco: Monaco, private mo: typeof Mo) {}

  triggerCharacters = ['.'];

  private lastTree: Node | undefined;

  provideCompletionItems(
    model: editor.ITextModel,
    position: Position,
    context: languages.CompletionContext,
    token: CancellationToken,
  ): languages.ProviderResult<languages.CompletionList> {
    const { monaco, mo } = this;

    try {
      this.lastTree = mo.parseMotoko(model.getValue());
    } catch (err) {}

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

    if (this.lastTree) {
      // AST is available, suggest symbols from code
      const completionTree = new CompletionTree(this.lastTree);
      let completions;

      if (!isAfterDot) {
        completions = completionTree.getCompletions(position.lineNumber, position.column);
      } else {
        const wordBeforeDot = model.getWordUntilPosition({
          lineNumber: dot.range.startLineNumber,
          column: dot.range.startColumn,
        }).word;
        completions = completionTree.getObjectCompletions(
          wordBeforeDot,
          position.lineNumber,
          position.column,
        );
      }

      suggestions = suggestions.concat(
        completions.variables.map(variable => ({
          label: variable,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: variable,
          range: range,
        })),
      );
      suggestions = suggestions.concat(
        completions.functions.map(fn => ({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: fn + '($1)',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        })),
      );
    }

    return { suggestions: suggestions };
  }
}
