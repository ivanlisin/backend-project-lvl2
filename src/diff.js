import _ from 'lodash';
import { makeNode } from './tree';

const makeData = (key, value1, value2) => {
  if (value1 === value2) {
    return { key, type: 'unchanged', value: value2 };
  }
  if (value1 === null) {
    return { key, type: 'added', value: { after: value2 } };
  }
  if (value2 === null) {
    return { key, type: 'deleted', value: { before: value1 } };
  }
  return { key, type: 'changed', value: { before: value1, after: value2 } };
};

export const makeDiff = (object1, object2, ancestry = []) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));
  return keys.map((key) => {
    const value1 = _.has(object1, key) ? object1[key] : null;
    const value2 = _.has(object2, key) ? object2[key] : null;
    const hasChildren = _.isObject(value1) && _.isObject(value2);
    const content = {
      data: makeData(key, value1, value2),
      meta: { ancestry, nodeType: hasChildren ? 'nested' : 'leaf' },
    };
    const children = hasChildren
      ? makeDiff(value1, value2, [...ancestry, key])
      : [];
    return makeNode(content, children);
  });
};

export const makeRenderFn = (converTreeToFormat, join) => (diff) => {
  const texts = diff.map(converTreeToFormat);
  return join(texts);
};
