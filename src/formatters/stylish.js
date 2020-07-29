import _ from 'lodash';
import {
  getType,
  getKey,
  getValueBefore,
  getValueAfter,
  getChildren,
} from '../diff';

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
    const key = getKey(diff);
    const indent = getIndent(depth);
    switch (getType(diff)) {
      case 'removed':
        return `${indent}- ${key}: ${renderValue(getValueBefore(diff), depth)}`;
      case 'added':
        return `${indent}+ ${key}: ${renderValue(getValueAfter(diff), depth)}`;
      case 'nested':
        return [
          `${indent}  ${key}: {`,
          renderDiffTree(getChildren(diff), depth + 1),
          `${indent}  }`,
        ].join('\n');
      case 'unchanged':
        return `${indent}  ${key}: ${renderValue(getValueAfter(diff), depth)}`;
      case 'changed':
        return [
          `${indent}- ${key}: ${renderValue(getValueBefore(diff), depth)}`,
          `${indent}+ ${key}: ${renderValue(getValueAfter(diff), depth)}`,
        ].join('\n');
      default:
        throw new Error(`Unknown type state: '${getType(diff)}'!`);
    }
  })
  .join('\n');

const renderStylish = (diffTree) => ['{', renderDiffTree(diffTree), '}'].join('\n');

export default renderStylish;
