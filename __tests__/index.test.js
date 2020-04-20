import genDiff from '../src';

const dir1 = '__fixtures__/flat';
const dir2 = '__fixtures__/recursive';

const pathToDir1 = `${__dirname}/../${dir1}`;
const pathToDir2 = `${__dirname}/../${dir2}`;

const diff1 = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
const diff2 = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: {
          key: value
      }
      setting6: {
          key: value
        + ops: vops
      }
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
  }
  group1: {
    + baz: bars
    - baz: bas
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
}`;

test('gendiff for flat files', () => {
  expect(genDiff(`${pathToDir1}/before.json`, `${pathToDir1}/after.json`)).toEqual(diff1);
  expect(genDiff(`${pathToDir1}/before.yaml`, `${pathToDir1}/after.yaml`)).toEqual(diff1);

  expect(genDiff(`${dir1}/before.yml`, `${dir1}/after.yml`)).toEqual(diff1);
  expect(genDiff(`${dir1}/before.ini`, `${dir1}/after.ini`)).toEqual(diff1);

  expect(() => genDiff(`${pathToDir1}/not-exist-1.json`, `${pathToDir1}/not-exist-2.json`)).toThrow();
  expect(() => genDiff(`${pathToDir1}/before.txt`, `${pathToDir1}/after.txt`)).toThrowError('.txt not supported');
});

test('gendiff for recursive files', () => {
  expect(genDiff(`${pathToDir2}/before.json`, `${pathToDir2}/after.json`)).toEqual(diff2);
  expect(genDiff(`${pathToDir2}/before.yaml`, `${pathToDir2}/after.yaml`)).toEqual(diff2);

  expect(genDiff(`${dir2}/before.yml`, `${dir2}/after.yml`)).toEqual(diff2);
  expect(genDiff(`${dir2}/before.ini`, `${dir2}/after.ini`)).toEqual(diff2);

  expect(() => genDiff(`${pathToDir2}/not-exist-1.json`, `${pathToDir2}/not-exist-2.json`)).toThrow();
  expect(() => genDiff(`${pathToDir2}/before.txt`, `${pathToDir2}/after.txt`)).toThrowError('.txt not supported');
});
