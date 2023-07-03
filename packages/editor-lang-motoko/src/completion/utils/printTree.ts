import { AST, Node } from 'motoko/src/ast';

export function printTree(ast: Node) {
  const out = printTreeInner(ast);
  console.log(out);
}

function printTreeInner(node: AST, indent = ''): string {
  let out = '';

  if (!node) {
    out = '';
  } else if (Array.isArray(node)) {
    for (const n of node) {
      out += printTreeInner(n, indent + '    ');
    }
  } else if (typeof node === 'object') {
    if (node.name) {
      out += `\n${indent}- ${node.name}`;
    }

    for (const arg of node.args || []) {
      out += printTreeInner(arg, indent + '    ');
    }
  } else {
    out += `\n${indent}- ${JSON.stringify(node)}`;
  }

  return out;
}
