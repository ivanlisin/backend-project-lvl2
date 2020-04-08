import genDiff from '../src';

const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('gendiff with arg .json', () => {
  const relativePath1 = '__fixtures__/before.json';
  const relativePath2 = '__fixtures__/after.json';
  const absolutePath1 = `${__dirname}/../${relativePath1}`;
  const absolutePath2 = `${__dirname}/../${relativePath2}`;

  expect(genDiff(relativePath1, relativePath2)).toEqual(diff);
  expect(genDiff(absolutePath1, absolutePath2)).toEqual(diff);
});

test('gendiff with arg .yaml', () => {
  const relativePath1 = '__fixtures__/before.yaml';
  const relativePath2 = '__fixtures__/after.yaml';
  const absolutePath1 = `${__dirname}/../${relativePath1}`;
  const absolutePath2 = `${__dirname}/../${relativePath2}`;

  expect(genDiff(relativePath1, relativePath2)).toEqual(diff);
  expect(genDiff(absolutePath1, absolutePath2)).toEqual(diff);
});

test('gendiff with arg .yml', () => {
  const relativePath1 = '__fixtures__/before.yml';
  const relativePath2 = '__fixtures__/after.yml';
  const absolutePath1 = `${__dirname}/../${relativePath1}`;
  const absolutePath2 = `${__dirname}/../${relativePath2}`;

  expect(genDiff(relativePath1, relativePath2)).toEqual(diff);
  expect(genDiff(absolutePath1, absolutePath2)).toEqual(diff);
});
