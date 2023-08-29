import { ProgramScope } from '../Program';

/**
 * Prints content of the scope and all of its children scopes.
 *
 * @param scope
 */
export function printScopes(scope: ProgramScope) {
  const out = printScopesInner(scope);
  console.log(out);
}

function printScopesInner(scope: ProgramScope, indent = ''): string {
  let out = '';

  out += `\n${indent}- Scope ${scope.id}(${scope.startRow}:${scope.startColumn}, ${scope.endRow}:${scope.endColumn})`;
  out += `\n${indent}  symbols: ${JSON.stringify(scope.symbols)}`;

  if (scope.children) {
    for (const child of scope.children) {
      out += printScopesInner(child, indent + '    ');
    }
  }

  return out;
}
