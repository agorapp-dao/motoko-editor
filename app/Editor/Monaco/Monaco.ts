// it is important to not import monaco-editor directly, otherwise it fails with navigator not defined on the server
import type TMonaco from 'monaco-editor';
import { configure } from 'motoko/contrib/monaco';

let monaco: Promise<typeof TMonaco>;

export async function getMonaco() {
  if (!monaco) {
    monaco = import('monaco-editor').then(monaco => {
    configure(monaco);

    monaco.languages.register({ id: 'motoko' });

    monaco.languages.setMonarchTokensProvider('motoko', {
    defaultToken: 'invalid',   

    // the keywords are taken from here: https://internetcomputer.org/docs/current/motoko/main/language-manual#keywords
    keywords: [  
      'actor', 'and', 'assert', 'async', 'async*', 'await', 'await*', 'break', 'case', 
      'catch', 'class', 'continue', 'debug', 'debug_show', 'do', 'else', 'flexible', 
      'false', 'for', 'from_candid', 'func', 'if', 'ignore', 'import', 'in', 'module', 
      'not', 'null', 'object', 'or', 'label', 'let', 'loop', 'private', 'public', 
      'query', 'return', 'shared', 'stable', 'switch', 'system', 'throw', 'to_candid', 
      'true', 'try', 'type', 'var', 'while', 'with' 
    ],  


    typeKeywords: [  
      'null', 'Infinity', 'NaN', 'undefined'
    ],   

    operators: [  
      '<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
      '*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
      '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
      '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
      '^=', '@',
    ],  

    symbols:  /[=><!~?:&|+\-*\/\^%]+/,  

    tokenizer: {
      root: [  
        // identifiers and keywords   
        [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',  
                                      '@keywords': 'keyword',  
                                      '@default': 'identifier' } }],
        [/[A-Z][\w\$]*/, 'type.identifier'],
        // whitespace   
        { include: '@whitespace' },  
      
        [/[{}()\[\]]/, '@brackets'],  
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, { cases: { '@operators': 'operator',  
                                '@default'  : '' } } ],  
      
        // numbers  
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],  
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],  
        [/\d+/, 'number'],  
      
        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],  
      
        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string  
        [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],    
      ],   
    
    string: [  
      [/[^\\"]+/, 'string'],  
      // [/@escapes/, 'string.escape'],  
      [/\\./, 'string.escape.invalid'],  
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' } ]    
    ],   

    whitespace: [  
      [/[ \t\r\n]+/, 'white'],  
      [/\/\*/,    'comment', '@comment' ],  
      [/\/\/.*$/, 'comment'],  
    ],   

    comment: [  
      [/[^\/*]+/, 'comment' ],  
      [/\/\*/,    'comment.invalid' ],
      [/\*\//,    'comment', '@pop' ],  
      [/[\/*]/,   'comment' ]
    ], 
    },
  });

  monaco.languages.registerCompletionItemProvider('motoko', {
  // TODO: fix the types
  //@ts-ignore
    provideCompletionItems: function(model, position, context, token) {
      // find word at cursor
      var word = model.getWordUntilPosition(position);

      var suggestions = [
        {
          label: 'actor',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'actor'
        },
        {
          label: `switch(#msg) {
            case (#msg) { };
          }`,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: `switch(#msg) {
            case (#msg) { };
          }`,
        },
        {
          label: `if (#msg) {  };`,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText:  `if (#msg) {  };`
        },
        {
          label: 'public',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'public'
        },
        {
          label: 'public func',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'public func'
        },
        {
          label: 'public shared',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'public shared'
        },
        {
          label: 'throw Error',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'throw Error'
        },      
        {
          label: 'to_candid',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'to_candid'
        },
        {
          label: 'Int', 
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'Int'
        },
        {
          label: 'String', 
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'String' 
        },
        {
          label: 'if',
          kind: monaco.languages.CompletionItemKind.Keyword, 
          insertText: 'if'
        },
        {
          label: 'else',
          kind: monaco.languages.CompletionItemKind.Keyword, 
          insertText: 'else'
        },
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Keyword, 
          insertText: 'for'
        },
        {
          label: 'while',
          kind: monaco.languages.CompletionItemKind.Keyword, 
          insertText: 'while'
        },
        {
          label: 'break',
          kind: monaco.languages.CompletionItemKind.Keyword, 
          insertText: 'break'
        },
        {
          label: 'continue',
          kind: monaco.languages.CompletionItemKind.Keyword, 
          insertText: 'continue'
        },
        {
          label: 'print',
          kind: monaco.languages.CompletionItemKind.Function, 
          insertText: 'print'
        },
        {
          label: 'assert',
          kind: monaco.languages.CompletionItemKind.Function, 
          insertText: 'assert'
        },
        {
          label: 'len',
          kind: monaco.languages.CompletionItemKind.Function, 
          insertText: 'len'
        },
        {
          label: 'range',
          kind: monaco.languages.CompletionItemKind.Function, 
          insertText: 'range' 
        },
      ];

    return { suggestions: suggestions };
    },
  });
  
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
