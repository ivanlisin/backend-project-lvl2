import path from 'path';
import genDiff from '../src';
import outputStylish from '../__fixtures__/output-stylish';
import outputPlain from '../__fixtures__/output-plain';
import outputJson from '../__fixtures__/output-json';

test('gendiff', () => {
  expect(genDiff(
    path.join(__dirname, '..', '__fixtures__', 'before.json'),
    path.join(__dirname, '..', '__fixtures__', 'after.json'),
    'stylish',
  )).toEqual(outputStylish);

  expect(genDiff(
    path.join('__fixtures__', 'before.yml'),
    path.join('__fixtures__', 'after.yml'),
    'plain',
  )).toEqual(outputPlain);

  expect(genDiff(
    path.join('__fixtures__', 'before.ini'),
    path.join('__fixtures__', 'after.ini'),
    'json',
  )).toEqual(outputJson);

  expect(() => genDiff(
    path.join('__fixtures__', 'not-exist-1.json'),
    path.join('__fixtures__', 'not-exist-2.json'),
    'stylish',
  )).toThrow();

  expect(() => genDiff(
    path.join('__fixtures__', 'before.txt'),
    path.join('__fixtures__', 'after.txt'),
    'stylish',
  )).toThrowError('extension txt not supported');

  expect(() => genDiff(
    path.join('__fixtures__', 'before.json'),
    path.join('__fixtures__', 'after.json'),
    'notSupportedFormat',
  )).toThrowError('format notSupportedFormat not supported');
});
