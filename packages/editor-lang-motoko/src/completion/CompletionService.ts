import mo from 'motoko/lib/versions/moc';
import motokoBasePackage from 'motoko/packages/latest/base.json';
import { Node } from 'motoko/lib/ast';
import { ProgramScope, ProgramSymbol, Program } from './Program';
import { printScopes } from './utils/printScopes';

export class CompletionService {
  private modules = new Map<String, Program>();

  constructor() {}

  /**
   * Adds new module to the completion service. If a module already exists, it gets replaced.
   *
   * @param moduleName  Name of the module. (Typically file name.)
   * @param ast   Abstract syntax tree of the module.
   */
  addModule(moduleName: string, ast: Node) {
    moduleName = this.normalizeModuleName(moduleName);
    this.modules.set(moduleName, new Program(moduleName, ast));
  }

  addBaseLibrary() {
    for (let moduleName of Object.keys(motokoBasePackage.files)) {
      moduleName = this.normalizeModuleName(moduleName);
      moduleName = `mo:base/${moduleName}`;
      this.addBaseModule(moduleName);
    }
  }

  /**
   * Adds module from the Motoko Base Library.
   *
   * @param moduleName
   */
  addBaseModule(moduleName: string) {
    let filename = moduleName.replace('mo:base/', '');
    filename += '.mo';
    const ast = mo.parseMotoko((motokoBasePackage as any).files[filename].content);
    this.addModule(moduleName, ast);
  }

  getSymbols(moduleName: string, row: number, column: number): ProgramSymbol[] {
    moduleName = this.normalizeModuleName(moduleName);
    const module = this.modules.get(moduleName);
    if (!module) {
      return [];
    }

    // find innermost scope
    let scope = this.findInnerMostScope(module.scope, row, column);
    if (!scope) {
      scope = module.scope;
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
   * @param moduleName
   * @param obj
   * @param row
   * @param column
   */
  getObjectSymbols(moduleName: string, obj: string, row: number, column: number): ProgramSymbol[] {
    moduleName = this.normalizeModuleName(moduleName);
    const module = this.modules.get(moduleName);
    if (!module) {
      return [];
    }

    // find innermost scope
    let scope = this.findInnerMostScope(module.scope, row, column);
    if (!scope) {
      scope = module.scope;
    }

    while (scope) {
      const symbol = scope.symbols.find(s => s.name === obj);

      if (symbol) {
        let fields = symbol.fields || [];
        if (symbol.ref) {
          const module = this.modules.get(symbol.ref.module);
          if (module) {
            const reffedSymbol = module.getSymbol(symbol.ref);
            fields = fields.concat(reffedSymbol?.fields || []);
          }
        }
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

  private normalizeModuleName(moduleName: string): string {
    if (moduleName.endsWith('.mo')) {
      return moduleName.substring(0, moduleName.length - 3);
    }
    return moduleName;
  }

  printScopes(moduleName: string) {
    moduleName = this.normalizeModuleName(moduleName);
    const module = this.modules.get(moduleName);
    if (module) {
      printScopes(module.scope);
    }
  }
}
