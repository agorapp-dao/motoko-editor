import mo from 'motoko/lib/versions/moc';
import { printTree } from './utils/printTree';
import { CompletionService } from './CompletionService';
import { ProgramSymbol } from './Program';

describe('CompletionService', () => {
  test('let variable', () => {
    const code = `
      let varA = "hello";
      let varB = "world";
    `;
    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    const symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['varA', 'varB'],
    });
  });

  test('var variable', () => {
    const code = `
      var varA = "hello";
      var varB = "world";
    `;
    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    const symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['varA', 'varB'],
    });
  });

  test('function', () => {
    const code = `
      func hello(param1 : Text, param2 : Text) {
      
      };
      func world() {
      
      };
    `;
    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    // global scope
    let symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      functions: ['hello', 'world'],
    });

    // local scope in hello func
    symbols = completion.getSymbols(3, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['param1', 'param2'],
      functions: ['hello', 'world'],
    });

    // local scope in world func
    symbols = completion.getSymbols(6, 0);
    expect(getNames(symbols)).toEqual({
      functions: ['hello', 'world'],
    });
  });

  test('Redeclared variable hides original', () => {
    const code = `
      let varA = "global";
      
      func someFunc(p1 : Text) {
        let varA = "local"
      };
    `;
    const ast = mo.parseMotoko(code);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    const symbols = completion.getSymbols(5, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['p1', 'varA'],
      functions: ['someFunc'],
    });
  });

  test('object', () => {
    const code = `
      let obj = object {
        public let x = 1;
        public var y = 2;
      
        public func sum() : Nat {
          x + y;
        };
      };
    `;
    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    let symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      objects: ['obj'],
    });

    symbols = completion.getSymbols(6, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['x', 'y'],
      objects: ['obj'],
      functions: ['sum'],
    });

    symbols = completion.getObjectSymbols('obj', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['x', 'y'],
      functions: ['sum'],
    });
  });

  test('class', () => {
    const code = `
      class MyClass() {
        public let x = 1;
        public var y = 2;
      
        public func sum() : Nat {
          x + y;
        };
      };
      
      let obj = MyClass();
    `;
    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    let symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      objects: ['obj'],
      classes: ['MyClass'],
    });

    symbols = completion.getSymbols(6, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['x', 'y'],
      classes: ['MyClass'],
      objects: ['obj'],
      functions: ['sum'],
    });

    symbols = completion.getObjectSymbols('obj', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['x', 'y'],
      functions: ['sum'],
    });
  });

  test('object - private vs public members', () => {
    const code = `
      let obj = object {
        var privateVar = 0;
        public var publicVar = 0;
      
        let privateLet = 0;
        public let publicLet = 0;
      
        func privateFunc() {
        };
      
        public func publicFunc() {
        };
      };
    `;

    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    // globally only `obj` is available
    let symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      objects: ['obj'],
    });

    // within the object all members are available
    symbols = completion.getSymbols(9, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['privateLet', 'privateVar', 'publicLet', 'publicVar'],
      objects: ['obj'],
      functions: ['privateFunc', 'publicFunc'],
    });

    // when using the object from the outside, only public members are available
    symbols = completion.getObjectSymbols('obj', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['publicLet', 'publicVar'],
      functions: ['publicFunc'],
    });
  });

  test('class - private vs public members', () => {
    const code = `
      class MyClass() {
        var privateVar = 0;
        public var publicVar = 0;
      
        let privateLet = 0;
        public let publicLet = 0;
      
        func privateFunc() {
        };
      
        public func publicFunc() {
        };
      };
      
      let obj = MyClass();
    `;

    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    // globally only `obj` and `MyClass` is available
    let symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      classes: ['MyClass'],
      objects: ['obj'],
    });

    // within the object all members are available
    symbols = completion.getSymbols(9, 0);
    expect(getNames(symbols)).toEqual({
      classes: ['MyClass'],
      objects: ['obj'],
      variables: ['privateLet', 'privateVar', 'publicLet', 'publicVar'],
      functions: ['privateFunc', 'publicFunc'],
    });

    // when using the object from the outside, only public members are available
    symbols = completion.getObjectSymbols('obj', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['publicLet', 'publicVar'],
      functions: ['publicFunc'],
    });
  });

  test('actor', () => {
    const code = `
      actor MyActor {
        var privateVar = 0;
        public var publicVar = 0;
      
        let privateLet = 0;
        public let publicLet = 0;
      
        func privateFunc() {
        };
      
        public func publicFunc() {
        };
      };
    `;

    const ast = mo.parseMotoko(code);
    // printTree(ast);
    const completion = new CompletionService(ast);
    // completion.printScopes();

    // globally only `MyActor` is available
    let symbols = completion.getSymbols(0, 0);
    expect(getNames(symbols)).toEqual({
      objects: ['MyActor'],
    });

    // within the actor all members are available
    symbols = completion.getSymbols(9, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['privateLet', 'privateVar', 'publicLet', 'publicVar'],
      objects: ['MyActor'],
      functions: ['privateFunc', 'publicFunc'],
    });

    // when using the actor from the outside, only public members are available
    symbols = completion.getObjectSymbols('MyActor', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['publicLet', 'publicVar'],
      functions: ['publicFunc'],
    });
  });
});

function getNames(symbols: ProgramSymbol[]) {
  let variables: string[] = [];
  let functions: string[] = [];
  let objects: string[] = [];
  let classes: string[] = [];

  for (const symbol of symbols) {
    switch (symbol.kind) {
      case 'variable':
        variables.push(symbol.name);
        break;
      case 'function':
        functions.push(symbol.name);
        break;
      case 'object':
        objects.push(symbol.name);
        break;
      case 'class':
        classes.push(symbol.name);
        break;
      default:
        throw new Error(`Unknown symbol kind: ${symbol.kind}`);
    }
  }

  // sort, we don't want to test the actual order of parameters here
  variables = variables.sort();
  functions = functions.sort();
  objects = objects.sort();
  classes = classes.sort();

  let names: {
    variables?: string[];
    functions?: string[];
    objects?: string[];
    classes?: string[];
  } = {};
  if (variables.length) {
    names.variables = variables;
  }
  if (functions.length) {
    names.functions = functions;
  }
  if (objects.length) {
    names.objects = objects;
  }
  if (classes.length) {
    names.classes = classes;
  }

  return names;
}
