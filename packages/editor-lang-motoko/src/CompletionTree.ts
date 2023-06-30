import { AST, Node } from 'motoko/src/ast';

export class CompletionTree {
  scope: CompletionScope = {
    id: 0, // for debugging
    children: [],

    startRow: -1, // root scope does not have any range
    startColumn: -1,
    endRow: -1,
    endColumn: -1,

    variables: [],
    functions: [],
  };

  private scopeIdCounter = 0;

  /**
   * Name of the variable or function that is currently being processed.
   * @private
   */
  private pendingVarP: string | undefined;

  constructor(private ast: Node) {
    this.processNodeChildren(ast);
  }

  getCompletions(row: number, column: number): Suggestions {
    // find innermost scope
    let scope = this.findInnerMostScope(this.scope, row, column);
    if (!scope) {
      scope = this.scope;
    }

    const variables = new Set<string>();
    const functions = new Set<string>();

    while (scope) {
      for (const variable of scope.variables) {
        variables.add(variable);
      }
      for (const func of scope.functions) {
        functions.add(func);
      }
      scope = scope.parent;
    }

    return {
      variables: Array.from(variables),
      functions: Array.from(functions),
    };
  }

  private findInnerMostScope(
    scope: CompletionScope,
    row: number,
    column: number,
  ): CompletionScope | undefined {
    if (this.isWithinScope(scope, row, column)) {
      // try to find a better match in children
      for (const child of scope.children) {
        let childMatch = this.findInnerMostScope(child, row, column);
        if (childMatch) {
          return childMatch;
        }
      }

      return scope;
    }

    return undefined;
  }

  private isWithinScope(scope: CompletionScope, row: number, column: number): boolean {
    if (scope.startRow === -1) {
      return true;
    }

    // Check if row is in range
    if (row < scope.startRow || row > scope.endRow) {
      return false;
    }

    // If row equals startRow or endRow, we need to check column
    if (row === scope.startRow && column < scope.startColumn) {
      return false;
    }
    if (row === scope.endRow && column > scope.endColumn) {
      return false;
    }

    // If not returned yet, then the position is in range
    return true;
  }

  private processNodeChildren(node: Node) {
    if (node.args) {
      for (const arg of node.args) {
        if (!arg) continue;

        if (Array.isArray(arg)) {
          throw new Error(`Don't know what to do with array`);
        }

        if (typeof arg === 'object') {
          switch (arg.name) {
            case 'FuncE':
              this.processFuncE(arg);
              break;
            case 'LetD':
              this.processLetD(arg);
              break;
            case 'VarD':
              this.processVarD(arg);
              break;
            case 'VarP':
              this.processVarP(arg);
              break;
            default:
              this.processUnknown(arg);
          }
        }
      }
    }
  }

  /**
   * Function expression
   */
  private processFuncE(node: Node) {
    if (!node.start || !node.end) {
      throw new Error(`FuncE does not have start or end position`);
    }

    if (this.pendingVarP) {
      this.scope.functions.push(this.pendingVarP);
      this.pendingVarP = undefined;
    }

    // create new scope for function
    const scope: CompletionScope = {
      id: ++this.scopeIdCounter, // for debugging

      parent: this.scope,
      children: [],

      startRow: node.start[0],
      startColumn: node.start[1],
      endRow: node.end[0],
      endColumn: node.end[1],

      variables: [],
      functions: [],
    };
    this.scope.children.push(scope);
    this.scope = scope;

    this.processNodeChildren(node);

    // restore previous scope
    this.scope = this.scope.parent!;
  }

  /**
   * `let` declaration
   */
  private processLetD(node: Node) {
    this.processNodeChildren(node);

    if (this.pendingVarP) {
      this.scope.variables.push(this.pendingVarP);
      this.pendingVarP = undefined;
    }
  }

  /**
   * `var` declaration
   */
  private processVarD(node: Node) {
    if (node.args) {
      const varName = node.args[0]?.toString();
      if (varName) {
        this.scope.variables.push(varName);
      }
    }
  }

  /**
   * TODO: I don't know what VarP is, but it contains name of variable declared with let and name of function.
   * @param node
   * @private
   */
  private processVarP(node: Node) {
    this.pendingVarP = node.args && (node.args[0] as string);
  }

  private processUnknown(node: Node) {
    this.processNodeChildren(node);
  }

  printTree() {
    const out = this.printTreeInner(this.ast);
    console.log(out);
  }

  private printTreeInner(node: AST, indent = ''): string {
    let out = '';

    if (!node) {
      out = '';
    } else if (Array.isArray(node)) {
      for (const n of node) {
        out += this.printTreeInner(n, indent + '    ');
      }
    } else if (typeof node === 'object') {
      if (node.name) {
        out += `\n${indent}- ${node.name}`;
      }

      for (const arg of node.args || []) {
        out += this.printTreeInner(arg, indent + '    ');
      }
    } else {
      out += `\n${indent}- ${JSON.stringify(node)}`;
    }

    return out;
  }

  printScopes() {
    const out = this.printScopesInner(this.scope);
    console.log(out);
  }

  private printScopesInner(scope: CompletionScope, indent = ''): string {
    let out = '';

    out += `\n${indent}- Scope ${scope.id}(${scope.startRow}:${scope.startColumn}, ${scope.endRow}:${scope.endColumn})`;
    out += `\n${indent}  variables: ${JSON.stringify(scope.variables)}`;
    out += `\n${indent}  functions: ${JSON.stringify(scope.functions)}`;

    if (scope.children) {
      for (const child of scope.children) {
        out += this.printScopesInner(child, indent + '    ');
      }
    }

    return out;
  }
}

interface CompletionScope {
  id: number;

  parent?: CompletionScope;
  children: CompletionScope[];

  startRow: number;
  startColumn: number;
  endRow: number;
  endColumn: number;

  variables: string[];
  functions: string[];
}

export interface Suggestions {
  variables: string[];
  functions: string[];
}
