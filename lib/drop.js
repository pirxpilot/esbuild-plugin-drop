const acorn = require('acorn');
const dash = require('dash-ast');
const MagicString = require('magic-string');
const { getBinding, visitBinding, visitScope } = require('scope-analyzer');
const isRequire = require('estree-is-require');

/* based on code from mini-unassert module */

module.exports = drop;

function drop(src, modules) {
  const sourceType = /^\s*(export|import)\b/.test(src) ? 'module' : 'script';
  const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType });
  const requires = findRequires(ast, modules);
  if (requires.length < 1) {
    return;
  }
  return updateSource(src, requires, ast);
}

function findRequires(ast, modules) {
  const requires = [];
  dash(ast, {
    enter(node, parent) {
      node.parent = parent;
    },
    leave(node) {
      visitScope(node);
      if (!isRequire(node) && node.type !== 'ImportDeclaration') {
        return;
      }
      for (const module of modules) {
        if (isRequire(node, module) || isImport(node, module)) {
          requires.push(node);
          return;
        }
      }
    }
  });
  return requires;
}

function updateSource(src, requires, ast) {
  const result = new MagicString(src);
  dash(ast, { leave: visitBinding });
  requires.forEach(node => {
    if (node.type === 'ImportDeclaration') {
      for (const s of node.specifiers) {
        const binding = getBinding(s.local);
        removeReferences(binding);
      }
      update(node, ';');
      return;
    }
    if (node.parent.type === 'CallExpression') {
      node = node.parent;
    }
    if (node.parent.type === 'VariableDeclarator') {
      const binding = getBinding(node.parent.id);
      removeReferences(binding);
      if (!binding.isReferenced()) {
        removeDeclaration(node);
      }
    }
  });

  return result.toString();

  function removeReferences(binding) {
    binding.getReferences().forEach(ref => {
      let use = ref.parent;
      if (use.type === 'MemberExpression' && use.object === ref) {
        use = use.parent;
      }
      if (use.type === 'CallExpression') {
        update(use.callee, 'void');
        binding.remove(ref);
      }
    });
  }

  function removeDeclaration({ parent }) {
    if (parent.type === 'VariableDeclarator' && parent.parent.declarations.length === 1) {
      update(parent.parent, ';');
    } else {
      update(parent, '');
    }
  }

  function update(node, replacement) {
    result.overwrite(node.start, node.end, replacement);
  }
}

function isImport(node, module) {
  return node.type === 'ImportDeclaration' && node.source.value === module;
}
