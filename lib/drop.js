const transformAst = require('transform-ast');
const { getBinding, visitBinding, visitScope } = require('scope-analyzer');
const isRequire = require('estree-is-require');

/* copied from mini-assert module */

module.exports = drop;

function drop(src, modules) {
  const requires = [];
  const result = transformAst(src, node => {
    visitScope(node);
    if (!isRequire(node)) { return; }
    for (const module of modules) {
      if (isRequire(node, module)) {
        requires.push(node);
        return;
      }
    }
  });
  result.walk(visitBinding);

  requires.forEach(node => {
    if (node.parent.type === 'VariableDeclarator') {
      const binding = getBinding(node.parent.id);
      removeReferences(binding);
      if (!binding.isReferenced()) {
        removeDeclaration(node);
      }
    }
  });

  return result.toString();
}

function removeReferences(binding) {
  binding.getReferences().forEach(ref => {
    let use = ref.parent;
    if (use.type === 'MemberExpression' && use.object === ref) {
      use = use.parent;
    }
    if (use.type === 'CallExpression') {
      use.callee.edit.update('void');
      binding.remove(ref);
    }
  });
}

function removeDeclaration({ parent }) {
  if (parent.type === 'VariableDeclarator' && parent.parent.declarations.length === 1) {
    parent.parent.edit.update(';');
  } else {
    parent.edit.update('');
  }
}
