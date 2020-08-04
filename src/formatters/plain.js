import _ from 'lodash';

const renderValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const renderPlain = (diffTree) => {
  const iter = (innerDiffTree, ancestry) => innerDiffTree.flatMap((diff) => {
    const property = [...ancestry, diff.key].join('.');
    switch (diff.type) {
      case 'removed':
        return `Property ${property} was removed`;
      case 'added':
        return `Property ${property} was added with value: ${renderValue(diff.valueAfter)}`;
      case 'nested':
        return iter(diff.children, [...ancestry, diff.key]);
      case 'unchanged':
        return [];
      case 'changed':
        return `Property ${property} was updated. From ${renderValue(diff.valueBefore)} to ${renderValue(diff.valueAfter)}`;
      default:
        throw new Error(`Unknown type state: '${diff.type}'!`);
    }
  }, Infinity).join('\n');
  return iter(diffTree, []);
};

export default renderPlain;
