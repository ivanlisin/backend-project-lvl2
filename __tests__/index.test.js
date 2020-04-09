import genDiff from '../src';

const relatPathToDir = '__fixtures__';
const absolPathToDir = `${__dirname}/../${relatPathToDir}`;

const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('gendiff', () => {
  expect(genDiff(`${relatPathToDir}/before.json`, `${relatPathToDir}/after.json`)).toEqual(diff);
  expect(genDiff(`${relatPathToDir}/before.yaml`, `${relatPathToDir}/after.yaml`)).toEqual(diff);
  expect(genDiff(`${relatPathToDir}/before.yml`, `${relatPathToDir}/after.yml`)).toEqual(diff);

  expect(genDiff(`${absolPathToDir}/before.yaml`, `${absolPathToDir}/after.yaml`)).toEqual(diff);
  expect(genDiff(`${absolPathToDir}/before.json`, `${absolPathToDir}/after.json`)).toEqual(diff);
  expect(genDiff(`${absolPathToDir}/before.yml`, `${absolPathToDir}/after.yml`)).toEqual(diff);

  expect(() => genDiff(`${relatPathToDir}/before.txt`, `${relatPathToDir}/after.txt`))
    .toThrowError(new Error('incorrect extname'));
});
