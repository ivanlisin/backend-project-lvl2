import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import { makeDiff } from './diff';
import render from './formatters';

const makeObject = (filepath) => {
  const text = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const extname = path.extname(path.basename(filepath)).slice(1);
  return parse(text, extname);
};

const compareObjects = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));
  return keys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    const hasChildren = _.isObject(value1) && _.isObject(value2);
    if (hasChildren) {
      const children = compareObjects(value1, value2);
      return makeDiff(key, object1, object2, children);
    }
    return makeDiff(key, object1, object2);
  });
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const object1 = makeObject(filepath1);
  const object2 = makeObject(filepath2);
  const diffTree = compareObjects(object1, object2);
  return render(diffTree, outputFormat);
};

export default genDiff;
