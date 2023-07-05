import { Node } from 'motoko/lib/ast';
import { ProgramScope, ProgramSymbol, Program } from './Program';
import { printScopes } from './utils/printScopes';

export class CompletionService {
  private program: Program;

  constructor(private ast: Node) {
    this.program = new Program(ast);
  }

  getSymbols(row: number, column: number): ProgramSymbol[] {
    // find innermost scope
    let scope = this.findInnerMostScope(this.program.scope, row, column);
    if (!scope) {
      scope = this.program.scope;
    }

    const symbols = new Map<string, ProgramSymbol>();

    while (scope) {
      for (const symbol of scope.symbols) {
        if (!symbols.has(symbol.name)) {
          symbols.set(symbol.name, symbol);
        }
      }

      scope = scope.parent;
    }

    return Array.from(symbols.values());
  }

  /**
   * Returns completions for the object instance (triggered after dot).
   *
   * @param obj
   * @param row
   * @param column
   */
  getObjectSymbols(obj: string, row: number, column: number): ProgramSymbol[] {
    // find innermost scope
    let scope = this.findInnerMostScope(this.program.scope, row, column);
    if (!scope) {
      scope = this.program.scope;
    }

    while (scope) {
      const symbol = scope.symbols.find(s => s.name === obj);

      if (symbol) {
        let fields = symbol.fields || [];
        fields = fields.filter(f => f.visibility === 'public');
        fields = fields.sort((a, b) => a.name.localeCompare(b.name));
        return fields;
      }

      scope = scope.parent;
    }

    return [];
  }

  private findInnerMostScope(
    scope: ProgramScope,
    row: number,
    column: number,
  ): ProgramScope | undefined {
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

  private isWithinScope(scope: ProgramScope, row: number, column: number): boolean {
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

  printScopes() {
    printScopes(this.program.scope);
  }
}
