import _ from 'lodash';
import { filterTree, reduceTree } from '../tree';

const isComplexValue = (value) => _.isObject(value) || Array.isArray(value);

const makeMessage = (key, type, value, ancestry) => {
  const beginStr = `Property ${[...ancestry, key].join('.')} was`;
  switch (type) {
    case 'added':
      return `${beginStr} added with value: ${isComplexValue(value.after) ? '[complex value]' : value.after}`;
    case 'deleted':
      return `${beginStr} removed`;
    case 'changed':
      return [
        beginStr,
        'updated. From',
        isComplexValue(value.before) ? '[complex value]' : value.before,
        'to',
        isComplexValue(value.after) ? '[complex value]' : value.after,
      ].join(' ');
    default:
      throw new Error(`Unknown type state: '${type}'!`);
  }
};

const convertTreeToPlain = (tree) => {
  const filteredTree = filterTree(tree, ({ data }) => data.type !== 'unchanged');
  const propertyList = reduceTree(filteredTree, (acc, { data, meta }) => {
    const { key, type, value } = data;
    const { ancestry, nodeType } = meta;
    if (nodeType === 'nested') {
      return acc;
    }
    return [...acc, makeMessage(key, type, value, ancestry)];
  }, []);
  return propertyList.join('\n');
};

export default convertTreeToPlain;
