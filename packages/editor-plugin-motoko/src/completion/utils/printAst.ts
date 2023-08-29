import { AST, Node } from 'motoko/lib/ast';

export function printAst(ast: Node) {
  const out = printAstInner(ast);
  console.log(out);
}

function printAstInner(node: AST, indent = ''): string {
  let out = '';

  if (!node) {
    out = '';
  } else if (Array.isArray(node)) {
    for (const n of node) {
      out += printAstInner(n, indent + '    ');
    }
  } else if (typeof node === 'object') {
    if (node.name) {
      out += `\n${indent}- ${node.name}`;
    }

    for (const arg of node.args || []) {
      out += printAstInner(arg, indent + '    ');
    }
  } else {
    out += `\n${indent}- ${JSON.stringify(node)}`;
  }

  return out;
}
