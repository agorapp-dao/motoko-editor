import mo from 'motoko/lib/versions/moc';
import { CompletionTree } from './CompletionTree';

describe('CompletionTree', () => {
  test('finds variable - let', () => {
    const code = `let varA = "hello";`;
    const ast = mo.parseMotoko(code);
    const completion = new CompletionTree(ast);
    const suggestions = completion.getCompletions(0, 0);
    expect(suggestions.variables).toEqual(['varA']);
    expect(suggestions.functions).toEqual([]);
  });

  test('finds variable - var', () => {
    const code = `var varA = "hello";`;
    const ast = mo.parseMotoko(code);
    const completion = new CompletionTree(ast);
    const suggestions = completion.getCompletions(0, 0);
    expect(suggestions.variables).toEqual(['varA']);
    expect(suggestions.functions).toEqual([]);
  });

  test('finds functions', () => {
    const code = `
      func hello() {
      };
    `;

    const ast = mo.parseMotoko(code);
    const completion = new CompletionTree(ast);
    const suggestions = completion.getCompletions(0, 0);
    expect(suggestions.variables).toEqual([]);
    expect(suggestions.functions).toEqual(['hello']);
  });

  test('function has its own private scope', () => {
    const code = `
      let varA = "global";
      
      func someFunc(p1 : Text) {
        let varB = "local"
      };
    `;
    const ast = mo.parseMotoko(code);
    const completion = new CompletionTree(ast);

    // only global variables are visible globally
    let suggestions = completion.getCompletions(0, 0);
    expect(suggestions.variables).toEqual(['varA']);
    expect(suggestions.functions).toEqual(['someFunc']);

    // additional local variable is visible inside the function
    suggestions = completion.getCompletions(5, 0);
    expect(suggestions.variables).toEqual(['varB', 'varA']); // note that local variables go first
    expect(suggestions.functions).toEqual(['someFunc']);
  });

  test('Redeclared variable hides original', () => {
    const code = `
      let varA = "global";
      
      func someFunc(p1 : Text) {
        let varA = "local"
      };
    `;
    const ast = mo.parseMotoko(code);
    const completion = new CompletionTree(ast);

    const suggestions = completion.getCompletions(5, 0);
    expect(suggestions.variables).toEqual(['varA']); // note that local variables go first
  });
});
