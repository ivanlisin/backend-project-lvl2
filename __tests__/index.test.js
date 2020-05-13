import genDiff from '../src';

const dir = '__fixtures__';
const pathToDir = `${__dirname}/../${dir}`;

const format1 = 'stylish';
const format2 = 'plain';
const notSupportedFormat = 'some format';

const diff1 = `{
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
const diff2 = `Property common.setting2 was deleted
Property common.setting3 was changed from true to [complex value]
Property common.setting6.ops was added with value: vops
Property common.follow was added with value: false
Property common.setting4 was added with value: blah blah
Property common.setting5 was added with value: [complex value]
Property group1.baz was changed from bas to undefined
Property group1.nest was changed from [complex value] to str
Property group2 was deleted
Property group3 was added with value: [complex value]`;

test('gendiff', () => {
  expect(genDiff(`${pathToDir}/before.json`, `${pathToDir}/after.json`, format1)).toEqual(diff1);
  expect(genDiff(`${pathToDir}/before.yaml`, `${pathToDir}/after.yaml`, format1)).toEqual(diff1);

  expect(genDiff(`${dir}/before.yml`, `${dir}/after.yml`, format2)).toEqual(diff2);
  expect(genDiff(`${dir}/before.ini`, `${dir}/after.ini`, format2)).toEqual(diff2);

  expect(() => genDiff(`${pathToDir}/not-exist-1.json`, `${pathToDir}/not-exist-2.json`, format1)).toThrow();
  expect(() => genDiff(`${pathToDir}/before.txt`, `${pathToDir}/after.txt`, format1)).toThrowError('.txt not supported');
  expect(() => genDiff(`${pathToDir}/before.json`, `${pathToDir}/after.json`, notSupportedFormat)).toThrowError(`${notSupportedFormat} not supported`);
});
