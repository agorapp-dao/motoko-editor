import mo from 'motoko/lib/versions/moc';
import { CompletionService } from './CompletionService';
import { ProgramSymbol } from './Program';

describe('CompletionService', () => {
  test('let variable', () => {
    const code = `
      let varA = "hello";
      let varB = "world";
    `;
    const completion = new CompletionService(mo);
    completion.printAst(code);
    completion.addModule('main.mo', code);
    completion.printScopes('main.mo');

    const symbols = completion.getSymbols('main.mo', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['varA', 'varB'],
    });
  });

  test('var variable', () => {
    const code = `
      var varA = "hello";
      var varB = "world";
    `;
    const completion = new CompletionService(mo);
    // completion.printAst(code);
    completion.addModule('main.mo', code);
    // completion.printScopes('main.mo');

    const symbols = completion.getSymbols('main.mo', 0, 0);
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
    const completion = new CompletionService(mo);
    // completion.printAst(code);
    completion.addModule('main.mo', code);
    // completion.printScopes('main.mo');

    // global scope
    let symbols = completion.getSymbols('main.mo', 0, 0);
    expect(getNames(symbols)).toEqual({
      functions: ['hello', 'world'],
    });

    // local scope in hello func
    symbols = completion.getSymbols('main.mo', 3, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['param1', 'param2'],
      functions: ['hello', 'world'],
    });

    // local scope in world func
    symbols = completion.getSymbols('main.mo', 6, 0);
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
    const completion = new CompletionService(mo);
    // completion.printAst(code);
    completion.addModule('main.mo', code);
    // completion.printScopes('main.mo');

    const symbols = completion.getSymbols('main.mo', 5, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['p1', 'varA'],
      functions: ['someFunc'],
    });
  });

  test('object', () => {
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

    const completion = new CompletionService(mo);
    // completion.printAst(code);
    completion.addModule('main.mo', code);
    // completion.printScopes('main.mo');

    // globally only `obj` is available
    let symbols = completion.getSymbols('main.mo', 0, 0);
    expect(getNames(symbols)).toEqual({
      objects: ['obj'],
    });

    // within the object all members are available
    symbols = completion.getSymbols('main.mo', 9, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['privateLet', 'privateVar', 'publicLet', 'publicVar'],
      objects: ['obj'],
      functions: ['privateFunc', 'publicFunc'],
    });

    // when using the object from the outside, only public members are available
    symbols = completion.getObjectSymbols('main.mo', 'obj', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['publicLet', 'publicVar'],
      functions: ['publicFunc'],
    });
  });

  test('class', () => {
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

    const completion = new CompletionService(mo);
    // completion.printAst(code);
    completion.addModule('main.mo', code);
    // completion.printScopes('main.mo');

    // globally only `obj` and `MyClass` is available
    let symbols = completion.getSymbols('main.mo', 0, 0);
    expect(getNames(symbols)).toEqual({
      classes: ['MyClass'],
      objects: ['obj'],
    });

    // within the object all members are available
    symbols = completion.getSymbols('main.mo', 9, 0);
    expect(getNames(symbols)).toEqual({
      classes: ['MyClass'],
      objects: ['obj'],
      variables: ['privateLet', 'privateVar', 'publicLet', 'publicVar'],
      functions: ['privateFunc', 'publicFunc'],
    });

    // when using the object from the outside, only public members are available
    symbols = completion.getObjectSymbols('main.mo', 'obj', 0, 0);
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

    const completion = new CompletionService(mo);
    // completion.printAst(code);
    completion.addModule('main.mo', code);
    // completion.printScopes('main.mo');

    // globally only `MyActor` is available
    let symbols = completion.getSymbols('main.mo', 0, 0);
    expect(getNames(symbols)).toEqual({
      actors: ['MyActor'],
    });

    // within the actor all members are available
    symbols = completion.getSymbols('main.mo', 9, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['privateLet', 'privateVar', 'publicLet', 'publicVar'],
      actors: ['MyActor'],
      functions: ['privateFunc', 'publicFunc'],
    });

    // when using the actor from the outside, only public members are available
    symbols = completion.getObjectSymbols('main.mo', 'MyActor', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['publicLet', 'publicVar'],
      functions: ['publicFunc'],
    });
  });

  test('module', () => {
    const moduleCode = `
      module {
        var privateVar = 0;
        public var publicVar = 0;
        
        func privateFunc() { };
        public func publicFunc() { };
      };
    `;
    const mainCode = `
      import MyModule "MyModule";
    `;

    let completion = new CompletionService(mo);
    completion.addModule('main.mo', mainCode);
    completion.addModule('MyModule.mo', moduleCode);
    // completion.printAst(mainCode);
    // completion.printAst(moduleCode);

    // completion.printScopes('main.mo');

    let symbols = completion.getObjectSymbols('main.mo', 'MyModule', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['publicVar'],
      functions: ['publicFunc'],
    });

    // make sure that it doesn't matter in which order you add the modules
    completion = new CompletionService(mo);
    completion.addModule('MyModule.mo', moduleCode);
    completion.addModule('main.mo', mainCode);

    symbols = completion.getObjectSymbols('main.mo', 'MyModule', 0, 0);
    expect(getNames(symbols)).toEqual({
      variables: ['publicVar'],
      functions: ['publicFunc'],
    });
  });

  test('import from base library', () => {
    const code = `
      import D "mo:base/Debug";
      import Nat "mo:base/Nat";
    `;
    const completion = new CompletionService(mo);
    // completion.printAst(mainCode);
    completion.addModule('main.mo', code);
    completion.addBaseModule('mo:base/Debug');
    completion.addBaseModule('mo:base/Nat');

    let symbols = completion.getObjectSymbols('main.mo', 'D', 0, 0);
    expect(getNames(symbols)).toEqual({
      functions: ['print', 'trap'],
    });

    symbols = completion.getObjectSymbols('main.mo', 'Nat', 0, 0);
    expect(getNames(symbols).functions).toContain('fromText');
  });
});

function getNames(symbols: ProgramSymbol[]) {
  let variables: string[] = [];
  let functions: string[] = [];
  let objects: string[] = [];
  let classes: string[] = [];
  let actors: string[] = [];
  let modules: string[] = [];

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
      case 'actor':
        actors.push(symbol.name);
        break;
      case 'module':
        modules.push(symbol.name);
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
  actors = actors.sort();
  modules = modules.sort();

  let names: {
    variables?: string[];
    functions?: string[];
    objects?: string[];
    classes?: string[];
    actors?: string[];
    modules?: string[];
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
  if (actors.length) {
    names.actors = actors;
  }
  if (modules.length) {
    names.modules = modules;
  }

  return names;
}
