import _ from 'lodash';

const renderValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const convertTreeToPlain = (node, ancestry) => {
  const property = [...ancestry, node.key].join('.');
  switch (node.type) {
    case 'added':
      return `Property ${property} was added with value: ${renderValue(node.value)}`;
    case 'removed':
      return `Property ${property} was removed`;
    case 'nested':
      return node.children.map((child) => convertTreeToPlain(child, [...ancestry, node.key]));
    case 'unchanged':
      return [];
    case 'changed':
      return `Property ${property} was updated. From ${renderValue(node.valueBefore)} to ${renderValue(node.valueAfter)}`;
    default:
      throw new Error(`Unknown type state: '${node.type}'!`);
  }
};

const convertDiffToPlain = (diff) => diff
  .map((tree) => convertTreeToPlain(tree, []))
  .flat(Infinity)
  .join('\n');

export default convertDiffToPlain;
