import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getObject = (pathToJson) => {
  const absolutePath = path.resolve(pathToJson);
  const text = fs.readFileSync(absolutePath);
  return JSON.parse(text);
};

const getKeys = (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2));

const getDiffByKey = (before, after, key) => {
  const isRemoved = !_.has(after, key);
  if (isRemoved) {
    const value = before[key];
    const message = `- ${key}: ${value}`;
    return message;
  }

  const isAdded = !_.has(before, key);
  if (isAdded) {
    const value = after[key];
    const message = `+ ${key}: ${value}`;
    return message;
  }

  const isChanged = after[key] !== before[key];
  if (isChanged) {
    const value1 = before[key];
    const value2 = after[key];
    const message1 = `- ${key}: ${value1}`;
    const message2 = `+ ${key}: ${value2}`;
    return [message1, message2];
  }

  const value = after[key];
  const message = `  ${key}: ${value}`;
  return message;
};

const getReport = (diff) => {
  const lines = diff.map((item) => `  ${item}`);
  const text = lines.join('\n');
  return `{\n${text}\n}`;
};

const genDiff = (pathToJson1, pathToJson2) => {
  const before = getObject(pathToJson1);
  const after = getObject(pathToJson2);

  const keys = getKeys(before, after);

  const diff = keys.reduce((acc, key) => {
    const datа = getDiffByKey(before, after, key);
    if (Array.isArray(datа)) {
      acc.push(...datа);
    } else {
      acc.push(datа);
    }
    return acc;
  }, []);

  return getReport(diff);
};

export default genDiff;
