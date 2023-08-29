import { AST, Node } from 'motoko/lib/ast';

export class Program {
  scope: ProgramScope = {
    id: 0, // for debugging
    children: [],

    startRow: -1, // root scope does not have any range
    startColumn: -1,
    endRow: -1,
    endColumn: -1,

    symbols: [],
  };

  /**
   * If the file exports the module, we will store it here.
   */
  module: ProgramSymbol | null = null;

  /**
   * All symbols in the program, by name.
   *
   * TODO: does not handle repeated names.
   */
  private allSymbols = new Map<string, ProgramSymbol>();

  constructor(
    private moduleName: string,
    private ast: Node,
  ) {
    this.processNode(ast);
  }

  getSymbol(ref: SymbolRef): ProgramSymbol | null {
    if (ref.class) {
      return this.allSymbols.get(ref.class) || null;
    } else if (ref.module) {
      return this.module;
    } else {
      return null;
    }
  }

  private processNode(node: any): ProgramSymbol | null {
    switch (node.name) {
      case 'Prog':
        return this.processProg(node);
      case 'LetD':
        return this.processLetD(node);
      case 'VarD':
        return this.processVarD(node);
      case 'FuncE':
        return this.processFuncE(node);
      case 'AnnotP':
        return this.processAnnotP(node);
      case 'ObjBlockE':
        return this.processObjBlockE(node);
      case 'ClassD':
        return this.processClassD(node);
      case 'DecField':
        return this.processDecField(node);
      case 'CallE':
        return this.processCallE(node);
      case 'VarE':
        return this.processVarE(node);
      case 'ImportE':
        return this.processImportE(node);
      default:
        return this.processUnknown(node);
    }
  }

  /**
   * We will ignore unknown nodes and process their children.
   *
   * @param node
   * @private
   */
  private processUnknown(node: Node): ProgramSymbol | null {
    if (!node.args) return null;

    // TODO: When handling nodes with multiple children, it's not clear what result to return. For now,
    // we will return result from the last node, but beware: this might not be correct behavior.
    let res = null;

    for (const arg of node.args) {
      if (isNode(arg)) {
        res = this.processNode(arg);
      }
    }
    return res;
  }

  private processProg(node: any): ProgramSymbol | null {
    for (const arg of node.args) {
      if (isNode(arg)) {
        let res = this.processNode(arg);
        if (res?.kind === 'module') {
          this.module = res;
          break;
        }
      }
    }

    return null;
  }

  /**
   * Variable declaration via `let`.
   */
  private processLetD(node: any): ProgramSymbol | null {
    const varPattern = node.args[0];
    const expression = node.args[1];

    if (varPattern.name !== 'VarP') {
      throw new Error(`[LetD] Cannot get name of variable, cannot find VarP node`);
    }
    const name = varPattern.args[0]?.toString();

    let symbol = this.processNode(expression);
    if (!symbol) {
      symbol = {
        name,
        visibility: 'private',
        kind: 'variable',
      };
    }

    symbol.name = name;

    this.addSymbol(symbol);

    return symbol;
  }

  /**
   * Variable declaration via `var`.
   */
  private processVarD(node: any): ProgramSymbol | null {
    const name = node.args[0];
    const expression = node.args[1];

    if (typeof name !== 'string') {
      throw new Error(`[VarD] Cannot get name of variable, first VarD arg is not string`);
    }

    let symbol = this.processNode(expression);
    if (!symbol) {
      symbol = {
        name,
        visibility: 'private',
        kind: 'variable',
      };
    }

    this.addSymbol(symbol);

    return symbol;
  }

  /**
   * Function expression. The following tree represents function declaration:
   *
   * - LetD
   *  - VarP(functionName)
   *  - FuncE(functionBody)
   *
   * @param node
   * @private
   */
  private processFuncE(node: any): ProgramSymbol | null {
    const name = node.args[2];
    const parameters = node.args[3];
    const body = node.args[5];

    if (typeof name !== 'string') {
      throw new Error(`[FuncE] Name of the function is not string`);
    }

    // create a new scope for function
    this.startChildScope(node);

    this.processNode(parameters);
    this.processNode(body);

    // restore previous scope
    this.endChildScope();

    return {
      name,
      visibility: 'private',
      kind: 'function',
    };
  }

  /**
   * Function parameter annotated with a type
   *
   * @param node
   * @private
   */
  private processAnnotP(node: any): ProgramSymbol | null {
    const varPattern = node.args[0];

    if (varPattern.name !== 'VarP') {
      throw new Error(`[LetD] Cannot get name of variable, cannot find VarP node`);
    }
    const name = varPattern.args[0]?.toString();
    this.addSymbol({
      name,
      visibility: 'private',
      kind: 'variable',
    });

    return null;
  }

  /**
   * Object block expression
   */
  private processObjBlockE(node: any): ProgramSymbol | null {
    const fields: ProgramSymbol[] = [];

    const objType = node.args[0];
    let kind: SymbolKind;
    switch (objType) {
      case 'Object':
        kind = 'object';
        break;
      case 'Actor':
        kind = 'actor';
        break;
      case 'Module':
        kind = 'module';
        break;
      default:
        throw new Error(`[ObjBlockE] Unknown object type: ${objType}`);
    }

    // create child scope for object block
    this.startChildScope(node);

    for (const arg of node.args) {
      if (arg.name === 'DecField') {
        const field = this.processNode(arg);
        if (field) {
          fields.push(field);
        }
      }
    }

    // restore parent scope
    this.endChildScope();

    return {
      name: '',
      visibility: 'private',
      kind,
      fields,
    };
  }

  /**
   * Class declaration.
   */
  private processClassD(node: any): ProgramSymbol | null {
    const fields: ProgramSymbol[] = [];

    const name = node.args[1];
    const symbol: ProgramSymbol = {
      name,
      visibility: 'private',
      kind: 'class',
      fields: [],
    };
    this.addSymbol(symbol);

    // create child scope for class block
    this.startChildScope(node);

    for (const arg of node.args) {
      if (arg.name === 'DecField') {
        const field = this.processNode(arg);
        if (field) {
          fields.push(field);
        }
      }
    }
    symbol.fields = fields;

    // restore parent scope
    this.endChildScope();

    return null;
  }

  private processDecField(node: any): ProgramSymbol | null {
    const expression = node.args[0];
    const visibility = node.args[1];

    const symbol = this.processNode(expression);
    if (symbol) {
      symbol.visibility = visibility === 'Public' ? 'public' : 'private';
    }

    return symbol;
  }

  private processCallE(node: any): ProgramSymbol | null {
    // TODO: not sure how to handle this, for now just process the first arg
    return this.processNode(node.args[0]);
  }

  /**
   * TODO: Right now I'm using this to capture constructor call. This will catch more than that probably.
   */
  private processVarE(node: any): ProgramSymbol | null {
    const name = node.args[0];

    const symbol = this.scope.symbols.find(s => s.name === name);
    if (symbol?.kind === 'class') {
      return {
        name: '',
        visibility: 'private',
        kind: 'object',
        ref: {
          module: this.moduleName,
          class: symbol.name,
        }, // save ref to class if this is a constructor call
      };
    }

    return null;
  }

  private processImportE(node: any): ProgramSymbol | null {
    const name = node.args[0];

    return {
      name: '',
      visibility: 'private',
      kind: 'variable', // TODO: what kind?
      ref: {
        module: name,
      },
    };
  }

  private scopeIdCounter = 0;

  private startChildScope(node: any) {
    const scope: ProgramScope = {
      id: ++this.scopeIdCounter, // for debugging

      parent: this.scope,
      children: [],

      startRow: node.start[0],
      startColumn: node.start[1],
      endRow: node.end[0],
      endColumn: node.end[1],

      symbols: [],
    };
    this.scope.children.push(scope);
    this.scope = scope;
  }

  private endChildScope() {
    this.scope = this.scope.parent!;
  }

  private addSymbol(symbol: ProgramSymbol) {
    this.scope.symbols.push(symbol);
    this.allSymbols.set(symbol.name, symbol);
  }
}

export interface ProgramScope {
  id: number;

  parent?: ProgramScope;
  children: ProgramScope[];

  startRow: number;
  startColumn: number;
  endRow: number;
  endColumn: number;

  symbols: ProgramSymbol[];
}

export interface ProgramSymbol {
  name: string;
  visibility: 'public' | 'private';
  kind: SymbolKind;

  /**
   * Symbol can contain other symbols as its fields. For example, a class has fields.
   */
  fields?: ProgramSymbol[];

  /**
   * Symbol can reference other symbols by name. For example, an object instance can reference its class.
   * Or imported name can reference a module.
   */
  ref?: SymbolRef;
}

export type SymbolKind = 'variable' | 'function' | 'object' | 'class' | 'actor' | 'module';

export interface SymbolRef {
  module: string;
  class?: string;
}

function isNode(value: AST): value is Node {
  return value != null && !Array.isArray(value) && typeof value === 'object' && !!value.name;
}
