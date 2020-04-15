import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parsers from './parsers';

const getText = (pathToFile) => {
  const absolutePath = path.resolve(pathToFile);
  return fs.readFileSync(absolutePath);
};

const getExtname = (pathToFile) => path.extname(path.basename(pathToFile));

const getObject = (text, extname) => {
  if (!_.has(parsers, extname)) {
    throw new Error(`${extname} not supported`);
  }

  const parse = parsers[extname];
  return parse(text);
};

const getKeys = (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2));

const getDiff = (before, after, keys) => keys
  .reduce((acc, key) => {
    const isUnchanged = before[key] === after[key];
    if (isUnchanged) {
      const value = after[key];
      acc.push(`  ${key}: ${value}`);
      return acc;
    }

    if (_.has(before, key)) {
      const value = before[key];
      acc.push(`- ${key}: ${value}`);
    }
    if (_.has(after, key)) {
      const value = after[key];
      acc.push(`+ ${key}: ${value}`);
    }
    return acc;
  }, []);

const getReport = (diff) => {
  const lines = diff.map((item) => `  ${item}`);
  const text = lines.join('\n');
  return `{\n${text}\n}`;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const [before, after] = [pathToFile1, pathToFile2].map((pathToFile) => {
    const text = getText(pathToFile);
    const extname = getExtname(pathToFile);
    return getObject(text, extname);
  });
  const keys = getKeys(before, after);
  const diff = getDiff(before, after, keys);
  return getReport(diff);
};

export default genDiff;
