import { Node } from 'motoko/src/ast';

export class CompletionTree {
  scope: CompletionScope = {
    variables: [],
    functions: [],
  };

  /**
   * Name of the variable or function that is currently being processed.
   * @private
   */
  private pendingVarP: string | undefined;

  constructor(node: Node) {
    this.processNode(node);
  }

  private processNode(node: Node) {
    if (node.args) {
      for (const arg of node.args) {
        if (!arg) continue;

        if (Array.isArray(arg)) {
          throw new Error(`Don't know what to do with array`);
        }

        if (typeof arg === 'object') {
          switch (arg.name) {
            case 'LetD':
              this.processLetD(arg);
              break;
            case 'VarP':
              this.processVarP(arg);
              break;
            case 'FuncE':
              this.processFuncE(arg);
              break;
            default:
            // console.log(`Ignoring ${arg.name}`);
          }
        }
      }
    }
  }

  private processLetD(node: Node) {
    if (node.args) {
      this.processNode(node);

      if (this.pendingVarP) {
        this.scope.variables.push(this.pendingVarP);
        this.pendingVarP = undefined;
      }
    }
  }

  private processVarP(node: Node) {
    this.pendingVarP = node.args && (node.args[0] as string);
  }

  private processFuncE(node: Node) {
    if (this.pendingVarP) {
      this.scope.functions.push(this.pendingVarP);
      this.pendingVarP = undefined;
    }
  }

  private processUnknown(node: Node) {
    if (node.args) {
      this.processNode(node);
    }
  }
}

export interface CompletionScope {
  variables: string[];
  functions: string[];
}
