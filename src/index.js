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
    const value1 = object1[key];
    const value2 = object2[key];

    if (!_.has(object1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(object2, key)) {
      return { key, type: 'removed', value: value1 };
    }

    const hasChildren = _.isObject(value1) && _.isObject(value2);
    if (hasChildren) {
      const children = compareObjects(value1, value2);
      return { key, type: 'nested', children };
    }

    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    return { key, type: 'changed', update: { from: value1, to: value2 } };
  });
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const object1 = makeObject(filepath1);
  const object2 = makeObject(filepath2);
  const diff = compareObjects(object1, object2);
  return render(diff, outputFormat);
};

export default genDiff;
