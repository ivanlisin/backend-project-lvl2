import _ from 'lodash';

const makeDiff = (key, object1, object2, children = []) => {
  const valueBefore = object1[key];
  const valueAfter = object2[key];
  const isRemoved = !_.has(object2, key);
  if (isRemoved) {
    return { key, type: 'removed', valueBefore };
  }
  const isAdded = !_.has(object1, key);
  if (isAdded) {
    return { key, type: 'added', valueAfter };
  }
  const hasChildren = _.isObject(valueBefore) && _.isObject(valueAfter);
  if (hasChildren) {
    return { key, type: 'nested', children };
  }
  const isUnchanged = valueBefore === valueAfter;
  return {
    key,
    type: isUnchanged ? 'unchanged' : 'changed',
    valueBefore,
    valueAfter,
  };
};

const getKey = (data) => data.key;

const getType = (data) => data.type;

const getValueBefore = (data, render = (v) => v) => render(data.valueBefore);

const getValueAfter = (data, render = (v) => v) => render(data.valueAfter);

const getChildren = (data) => data.children;

export {
  makeDiff,
  getKey,
  getType,
  getValueBefore,
  getValueAfter,
  getChildren,
};
