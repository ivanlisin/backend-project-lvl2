import _ from 'lodash';

const renderValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const convertTreeToPlain = (tree, ancestry) => {
  const { key, type, value, children } = tree;
  if (type === 'nested') {
    return children.map((child) => convertTreeToPlain(child, [...ancestry, key]));
  }
  const property = [...ancestry, key].join('.');
  switch (type) {
    case 'unchanged':
      return [];
    case 'removed':
      return `Property ${property} was removed`;
    case 'added':
      return `Property ${property} was added with value: ${renderValue(value)}`;
    case 'changed':
      return `Property ${property} was updated. From ${renderValue(value.before)} to ${renderValue(value.after)}`;
    default:
      throw new Error(`Unknown type state: '${type}'!`);
  }
};

const convertDiffToPlain = (diff) => diff
  .map((tree) => convertTreeToPlain(tree, []))
  .flat(Infinity)
  .join('\n');

export default convertDiffToPlain;
