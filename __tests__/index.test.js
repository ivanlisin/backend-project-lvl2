import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['before.json', 'after.json', 'stylish', 'diff.stylish'],
  ['before.yml', 'after.yml', 'plain', 'diff.plain'],
  ['before.ini', 'after.ini', 'json', 'diff.json'],
])('gendiff with %s %s', (filename1, filename2, format, filenameDiff) => {
  const path1 = getFixturePath(filename1);
  const path2 = getFixturePath(filename2);
  const expected = readFile(filenameDiff);
  expect(genDiff(path1, path2, format)).toBe(expected);
});
