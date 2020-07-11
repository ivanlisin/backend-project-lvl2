const object1 = {
  key: 'common',
  type: 'nested',
  children: [
    {
      key: 'setting1',
      type: 'unchanged',
      value: 'Value 1',
    },
    {
      key: 'setting2',
      type: 'removed',
      value: 200,
    },
    {
      key: 'setting3',
      type: 'changed',
      value: {
        before: true,
        after: {
          key: 'value',
        },
      },
    },
    {
      key: 'setting6',
      type: 'nested',
      children: [
        {
          key: 'key',
          type: 'unchanged',
          value: 'value',
        },
        {
          key: 'ops',
          type: 'added',
          value: 'vops',
        },
      ],
    },
    {
      key: 'follow',
      type: 'added',
      value: false,
    },
    {
      key: 'setting4',
      type: 'added',
      value: 'blah blah',
    },
    {
      key: 'setting5',
      type: 'added',
      value: { key5: 'value5' },
    },
  ],
};

const object2 = {
  key: 'group1',
  type: 'nested',
  children: [
    {
      key: 'baz',
      type: 'changed',
      value: {
        before: 'bas',
        after: 'bars',
      },
    },
    {
      key: 'foo',
      type: 'unchanged',
      value: 'bar',
    },
    {
      key: 'nest',
      type: 'changed',
      value: {
        before: {
          key: 'value',
        },
        after: 'str',
      },
    },
  ],
};

const object3 = {
  key: 'group2',
  type: 'removed',
  value: { abc: 12345 },
};

const object4 = {
  key: 'group3',
  type: 'added',
  value: { fee: 100500 },
};

export default [object1, object2, object3, object4];