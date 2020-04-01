import genDiff from '../src';

const relativePath1 = '__fixtures__/before.json';
const relativePath2 = '__fixtures__/after.json';

const absolutePath1 = `${__dirname}/../${relativePath1}`;
const absolutePath2 = `${__dirname}/../${relativePath2}`;

const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('test genDiff() with relative path', () => {
  expect(genDiff(relativePath1, relativePath2)).toEqual(diff);
});

test('test genDiff() with absolute path', () => {
  expect(genDiff(absolutePath1, absolutePath2)).toEqual(diff);
});
