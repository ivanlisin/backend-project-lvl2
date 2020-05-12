import genDiff from '../src';

const dir = '__fixtures__';
const pathToDir = `${__dirname}/../${dir}`;
const defaultFormat = 'stylish';
const notSupportedFormat = 'star';
const diff = `{
    common: {
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
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
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

test('gendiff for recursive files', () => {
  expect(genDiff(`${pathToDir}/before.json`, `${pathToDir}/after.json`, defaultFormat)).toEqual(diff);
  expect(genDiff(`${pathToDir}/before.yaml`, `${pathToDir}/after.yaml`, defaultFormat)).toEqual(diff);

  expect(genDiff(`${dir}/before.yml`, `${dir}/after.yml`, defaultFormat)).toEqual(diff);
  expect(genDiff(`${dir}/before.ini`, `${dir}/after.ini`, defaultFormat)).toEqual(diff);

  expect(() => genDiff(`${pathToDir}/not-exist-1.json`, `${pathToDir}/not-exist-2.json`, defaultFormat)).toThrow();
  expect(() => genDiff(`${pathToDir}/before.txt`, `${pathToDir}/after.txt`, defaultFormat)).toThrowError('.txt not supported');
  expect(() => genDiff(`${pathToDir}/before.json`, `${pathToDir}/after.json`, notSupportedFormat)).toThrowError(`${notSupportedFormat} not supported`);
});
