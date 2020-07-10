import path from 'path';
import fs from 'fs';
import genDiff from '../src';
import diff from '../__fixtures__/diff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let outputStylish;
let outputPlain;
let outputJson;

beforeAll(() => {
  outputStylish = readFile('stylish.txt');
  outputPlain = readFile('plain.txt');
  outputJson = JSON.stringify(diff);
});

test('gendiff', () => {
  expect(genDiff(
    getFixturePath('before.json'),
    getFixturePath('after.json'),
    'stylish',
  )).toEqual(outputStylish);

  expect(genDiff(
    getFixturePath('before.yml'),
    getFixturePath('after.yml'),
    'plain',
  )).toEqual(outputPlain);

  expect(genDiff(
    getFixturePath('before.ini'),
    getFixturePath('after.ini'),
    'json',
  )).toEqual(outputJson);

  expect(() => genDiff(
    getFixturePath('not-exist-1.json'),
    getFixturePath('not-exist-2.json'),
    'stylish',
  )).toThrow();

  expect(() => genDiff(
    getFixturePath('before.txt'),
    getFixturePath('after.txt'),
    'stylish',
  )).toThrowError('extension txt not supported');

  expect(() => genDiff(
    getFixturePath('before.json'),
    getFixturePath('after.json'),
    'notSupportedFormat',
  )).toThrowError('format notSupportedFormat not supported');
});
