import _ from 'lodash';
import path from 'path';
import { parseJson, parseYaml } from './parsers';

const getObject = (pathToFile) => {
  const basename = path.basename(pathToFile);
  const extname = path.extname(basename);

  if (extname === '.json') {
    return parseJson(pathToFile);
  }
  if (extname === '.yaml' || extname === '.yml') {
    return parseYaml(pathToFile);
  }
  throw new Error('object not created');
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
  let before;
  let after;
  try {
    before = getObject(pathToFile1);
    after = getObject(pathToFile2);
  } catch (err) {
    throw new Error('incorrect extname');
  }

  const keys = getKeys(before, after);
  const diff = getDiff(before, after, keys);
  return getReport(diff);
};

export default genDiff;
