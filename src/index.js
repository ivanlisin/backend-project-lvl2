import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import format from './formatters';

// eslint-disable-next-line no-shadow
const compare = (obj1, obj2, path = []) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      const child1 = value1;
      const child2 = value2;
      acc[key] = compare(child1, child2, [...path, key]);
      return acc;
    }

    if (value1 === value2) {
      acc[key] = value1;
      return acc;
    }

    if (_.has(obj1, key)) {
      acc[`- ${key}`] = value1;
    }
    if (_.has(obj2, key)) {
      acc[`+ ${key}`] = value2;
    }
    return acc;
  }, {});
};

export default (pathToFile1, pathToFile2, outputFormat) => {
  const [before, after] = [pathToFile1, pathToFile2].map((pathToFile) => {
    const text = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
    const extname = path.extname(path.basename(pathToFile));
    return parse(text, extname);
  });
  const diff = compare(before, after);
  return format(diff, outputFormat);
};
