import _ from 'lodash';

const renderValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const renderPlain = (diffTree, ancestry = []) => diffTree
  .map((diff) => {
    const property = [...ancestry, diff.key].join('.');
    switch (diff.type) {
      case 'removed':
        return `Property ${property} was removed`;
      case 'added':
        return `Property ${property} was added with value: ${renderValue(diff.valueAfter)}`;
      case 'nested':
        return renderPlain(diff.children, [...ancestry, diff.key]);
      case 'unchanged':
        return [];
      case 'changed':
        return `Property ${property} was updated. From ${renderValue(diff.valueBefore)} to ${renderValue(diff.valueAfter)}`;
      default:
        throw new Error(`Unknown type state: '${diff.type}'!`);
    }
  })
  .flat(Infinity)
  .join('\n');

export default renderPlain;
