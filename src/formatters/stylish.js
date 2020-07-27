import _ from 'lodash';

const makeIndent = (depth) => {
  const indentStep = ' '.repeat(4);
  return `  ${indentStep.repeat(depth)}`;
};

const renderObject = (object, depth) => {
  const iter = (obj, depth) => {
    const keys = Object.keys(obj);
    return keys.flatMap((key) => {
      const indent = makeIndent(depth);
      const value = obj[key];
      if (_.isObject(value)) {
        const child = value;
        const result = iter(child, depth + 1);
        const beginStr = `${indent}  key: {`;
        const endStr = `${indent}  }`;
        return [beginStr, result, endStr];
      }
      return `${indent}  ${key}: ${value}`;
    }, Infinity).join('\n');
  };
  const indent = makeIndent(depth);
  const text = iter(object, depth + 1);
  return ['{', text, `${indent}  }`].join('\n');
};

const renderValue = (value, depth) => (_.isObject(value) ? renderObject(value, depth) : value);

const convertTreeToStylish = (node, depth) => {
  const indent = makeIndent(depth);
  switch (node.type) {
    case 'nested':
      return [
        `${indent}  ${node.key}: {`,
        ...node.children.map((child) => convertTreeToStylish(child, depth + 1)),
        `${indent}  }`,
      ].join('\n');
    case 'unchanged':
      return `${indent}  ${node.key}: ${renderValue(node.value, depth)}`;
    case 'removed':
      return `${indent}- ${node.key}: ${renderValue(node.value, depth)}`;
    case 'added':
      return `${indent}+ ${node.key}: ${renderValue(node.value, depth)}`;
    case 'changed':
      return [
        `${indent}- ${node.key}: ${renderValue(node.valueBefore, depth)}`,
        `${indent}+ ${node.key}: ${renderValue(node.valueAfter, depth)}`,
      ].join('\n');
    default:
      throw new Error(`Unknown type state: '${node.type}'!`);
  }
};

const convertDiffToStylish = (diff) => {
  const text = diff
    .map((tree) => convertTreeToStylish(tree, 0))
    .join('\n');
  return ['{', text, '}'].join('\n');
};

export default convertDiffToStylish;
