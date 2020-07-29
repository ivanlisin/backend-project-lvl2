import _ from 'lodash';
import {
  getType,
  getKey,
  getValueBefore,
  getValueAfter,
  getChildren,
} from '../diff';

const renderValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const renderPlain = (diffTree, ancestry = []) => diffTree
  .map((diff) => {
    const key = getKey(diff);
    const property = [...ancestry, getKey(diff)].join('.');
    switch (getType(diff)) {
      case 'removed':
        return `Property ${property} was removed`;
      case 'added':
        return `Property ${property} was added with value: ${getValueAfter(diff, renderValue)}`;
      case 'nested':
        return renderPlain(getChildren(diff), [...ancestry, key]);
      case 'unchanged':
        return [];
      case 'changed':
        return `Property ${property} was updated. From ${getValueBefore(diff, renderValue)} to ${getValueAfter(diff, renderValue)}`;
      default:
        throw new Error(`Unknown type state: '${getType(diff)}'!`);
    }
  })
  .flat(Infinity)
  .join('\n');

export default renderPlain;
