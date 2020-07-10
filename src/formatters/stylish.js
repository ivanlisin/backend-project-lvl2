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

const convertTreeToStylish = (tree, depth) => {
  const indent = makeIndent(depth);
  const { key, type, value, children } = tree;
  if (type === 'nested') {
    const result = children.map((child) => convertTreeToStylish(child, depth + 1));
    return [`${indent}  ${key}: {`, ...result, `${indent}  }`].join('\n');
  }
  switch (type) {
    case 'unchanged':
      return `${indent}  ${key}: ${renderValue(value, depth)}`;
    case 'removed':
      return `${indent}- ${key}: ${renderValue(value, depth)}`;
    case 'added':
      return `${indent}+ ${key}: ${renderValue(value, depth)}`;
    case 'changed':
      return [
        `${indent}- ${key}: ${renderValue(value.before, depth)}`,
        `${indent}+ ${key}: ${renderValue(value.after, depth)}`,
      ].join('\n');
    default:
      throw new Error(`Unknown type state: '${type}'!`);
  }
};

const convertDiffToStylish = (diff) => {
  const text = diff
    .map((tree) => convertTreeToStylish(tree, 0))
    .join('\n');
  return ['{', text, '}'].join('\n');
};

export default convertDiffToStylish;
