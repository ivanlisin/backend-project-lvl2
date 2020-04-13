import genDiff from '../src';

const dir = '__fixtures__';
const pathToDir = `${__dirname}/../${dir}`;

const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('gendiff', () => {
  expect(genDiff(`${pathToDir}/before.json`, `${pathToDir}/after.json`)).toEqual(diff);
  expect(genDiff(`${pathToDir}/before.yaml`, `${pathToDir}/after.yaml`)).toEqual(diff);

  expect(genDiff(`${dir}/before.yml`, `${dir}/after.yml`)).toEqual(diff);

  expect(() => genDiff(`${pathToDir}/not-exist-1.json`, `${pathToDir}/not-exist-2.json`)).toThrow();
  expect(() => genDiff(`${pathToDir}/before.txt`, `${pathToDir}/after.txt`)).toThrowError('.txt not supported');
});
