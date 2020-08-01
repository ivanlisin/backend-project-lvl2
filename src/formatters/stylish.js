import _ from 'lodash';

const getIndent = (depth) => {
  const indentStep = ' '.repeat(4);
  return `  ${indentStep.repeat(depth)}`;
};

const renderObject = (object, depth) => {
  const keys = Object.keys(object);
  const text = keys.map((key) => {
    const indent = getIndent(depth + 1);
    const value = object[key];
    if (_.isObject(value)) {
      return [
        `${indent}  ${key}: {`,
        renderObject(object, depth + 1),
        `${indent}  }`,
      ].join('\n');
    }
    return `${indent}  ${key}: ${value}`;
  }).join('\n');

  const indent = getIndent(depth);
  return ['{', text, `${indent}  }`].join('\n');
};

const renderValue = (value, depth) => (_.isObject(value) ? renderObject(value, depth) : value);

const renderDiffTree = (diffTree, depth = 0) => diffTree
  .map((diff) => {
    const indent = getIndent(depth);
    switch (diff.type) {
      case 'removed':
        return `${indent}- ${diff.key}: ${renderValue(diff.valueBefore, depth)}`;
      case 'added':
        return `${indent}+ ${diff.key}: ${renderValue(diff.valueAfter, depth)}`;
      case 'nested':
        return [
          `${indent}  ${diff.key}: {`,
          renderDiffTree(diff.children, depth + 1),
          `${indent}  }`,
        ].join('\n');
      case 'unchanged':
        return `${indent}  ${diff.key}: ${renderValue(diff.valueAfter, depth)}`;
      case 'changed':
        return [
          `${indent}- ${diff.key}: ${renderValue(diff.valueBefore, depth)}`,
          `${indent}+ ${diff.key}: ${renderValue(diff.valueAfter, depth)}`,
        ].join('\n');
      default:
        throw new Error(`Unknown type state: '${diff.type}'!`);
    }
  })
  .join('\n');

const renderStylish = (diffTree) => ['{', renderDiffTree(diffTree), '}'].join('\n');

export default renderStylish;
