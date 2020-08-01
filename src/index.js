import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './formatters';

const makeObject = (filepath) => {
  const text = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const extname = path.extname(path.basename(filepath)).slice(1);
  return parse(text, extname);
};

const compareObjects = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));
  return keys.map((key) => {
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
      const children = compareObjects(valueBefore, valueAfter);
      return { key, type: 'nested', children };
    }
    const isUnchanged = valueBefore === valueAfter;
    return {
      key,
      type: isUnchanged ? 'unchanged' : 'changed',
      valueBefore,
      valueAfter,
    };
  });
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const object1 = makeObject(filepath1);
  const object2 = makeObject(filepath2);
  const diffTree = compareObjects(object1, object2);
  return render(diffTree, outputFormat);
};

export default genDiff;
