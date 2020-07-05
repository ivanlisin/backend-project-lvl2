import _ from 'lodash';
import { sumTreeBy } from '../tree';

const indentStep = ' '.repeat(4);

const signs = {
  unchanged: '  ',
  deleted: '- ',
  added: '+ ',
};

const renderObject = (object, depth) => {
  const iter = (obj, indent) => {
    const keys = Object.keys(obj);
    return keys.flatMap((key) => {
      const value = obj[key];
      if (_.isObject(value)) {
        const child = value;
        const result = iter(child, `${indent}${indentStep}`);
        const beginStr = [indent, signs.unchanged, key, ': {'].join('');
        const endStr = [indent, signs.unchanged, '}'].join('');
        return [beginStr, result, endStr];
      }
      return [indent, signs.unchanged, `${key}: `, value].join('');
    }, Infinity).join('\n');
  };
  const indent = ['  ', indentStep.repeat(depth)].join('');
  const text = iter(object, `${indent}${indentStep}`);
  return ['{', text, `${indent}  }`].join('\n');
};

const renderValue = (value, depth) => (_.isObject(value) ? renderObject(value, depth) : value);

// eslint-disable-next-line max-len
const convertTreeToStylish = (tree) => sumTreeBy(tree, ({ data, meta }, lowerLevelResults) => {
  const { key, type, value } = data;
  const { ancestry, nodeType } = meta;
  const depth = ancestry.length;
  const indent = ['  ', indentStep.repeat(depth)].join('');

  if (nodeType === 'nested') {
    const strBegin = [indent, signs.unchanged, key, ': {'].join('');
    const strEnd = [indent, '  ', '}'].join('');
    return [strBegin, ...lowerLevelResults, strEnd].join('\n');
  }

  if (type === 'unchanged') {
    const str = [indent, signs.unchanged, key, ': ', renderValue(value, depth)].join('');
    return lowerLevelResults === null ? str : [...lowerLevelResults, str].join('\n');
  }
  if (type === 'deleted') {
    const str = [indent, signs.deleted, key, ': ', renderValue(value.before, depth)].join('');
    return lowerLevelResults === null ? str : [...lowerLevelResults, str].join('\n');
  }
  if (type === 'added') {
    const str = [indent, signs.added, key, ': ', renderValue(value.after, depth)].join('');
    return lowerLevelResults === null ? str : [...lowerLevelResults, str].join('\n');
  }
  if (type === 'changed') {
    const str1 = [indent, signs.deleted, key, ': ', renderValue(value.before, depth)].join('');
    const str2 = [indent, signs.added, key, ': ', renderValue(value.after, depth)].join('');
    const text = [str1, str2].join('\n');
    return lowerLevelResults === null ? text : [...lowerLevelResults, text].join('\n');
  }
  throw new Error(`Unknown type state: '${type}'!`);
}, []);

export default convertTreeToStylish;
