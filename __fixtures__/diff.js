const object1 = {
  content: {
    data: {
      key: 'common',
      type: 'changed',
      value: {
        before: {
          setting1: 'Value 1',
          setting2: 200,
          setting3: true,
          setting6: {
            key: 'value',
          },
        },
        after: {
          follow: false,
          setting1: 'Value 1',
          setting4: 'blah blah',
          setting3: {
            key: 'value',
          },
          setting5: {
            key5: 'value5',
          },
          setting6: {
            key: 'value',
            ops: 'vops',
          },
        },
      },
    },
    meta: {
      ancestry: [],
      nodeType: 'nested',
    },
  },
  children: [
    {
      content: {
        data: {
          key: 'setting1',
          type: 'unchanged',
          value: 'Value 1',
        },
        meta: {
          ancestry: ['common'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
    {
      content: {
        data: {
          key: 'setting2',
          type: 'deleted',
          value: { before: 200 },
        },
        meta: {
          ancestry: ['common'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
    {
      content: {
        data: {
          key: 'setting3',
          type: 'changed',
          value: {
            before: true,
            after: {
              key: 'value',
            },
          },
        },
        meta: {
          ancestry: ['common'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
    {
      content: {
        data: {
          key: 'setting6',
          type: 'changed',
          value: {
            before: {
              key: 'value',
            },
            after: {
              key: 'value',
              ops: 'vops',
            },
          },
        },
        meta: {
          ancestry: ['common'],
          nodeType: 'nested',
        },
      },
      children: [
        {
          content: {
            data: {
              key: 'key',
              type: 'unchanged',
              value: 'value',
            },
            meta: {
              ancestry: ['common', 'setting6'],
              nodeType: 'leaf',
            },
          },
          children: [],
        },
        {
          content: {
            data: {
              key: 'ops',
              type: 'added',
              value: {
                after: 'vops',
              },
            },
            meta: {
              ancestry: ['common', 'setting6'],
              nodeType: 'leaf',
            },
          },
          children: [],
        },
      ],
    },
    {
      content: {
        data: {
          key: 'follow',
          type: 'added',
          value: {
            after: false,
          },
        },
        meta: {
          ancestry: ['common'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
    {
      content: {
        data: {
          key: 'setting4',
          type: 'added',
          value: { after: 'blah blah' },
        },
        meta: {
          ancestry: ['common'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
    {
      content: {
        data: {
          key: 'setting5',
          type: 'added',
          value: { after: { key5: 'value5' } },
        },
        meta: {
          ancestry: ['common'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
  ],
};

const object2 = {
  content: {
    data: {
      key: 'group1',
      type: 'changed',
      value: {
        before: {
          baz: 'bas',
          foo: 'bar',
          nest: {
            key: 'value',
          },
        },
        after: {
          foo: 'bar',
          baz: 'bars',
          nest: 'str',
        },
      },
    },
    meta: {
      ancestry: [],
      nodeType: 'nested',
    },
  },
  children: [
    {
      content: {
        data: {
          key: 'baz',
          type: 'changed',
          value: {
            before: 'bas',
            after: 'bars',
          },
        },
        meta: {
          ancestry: ['group1'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
    {
      content: {
        data: {
          key: 'foo',
          type: 'unchanged',
          value: 'bar',
        },
        meta: {
          ancestry: ['group1'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
    {
      content: {
        data: {
          key: 'nest',
          type: 'changed',
          value: {
            before: {
              key: 'value',
            },
            after: 'str',
          },
        },
        meta: {
          ancestry: ['group1'],
          nodeType: 'leaf',
        },
      },
      children: [],
    },
  ],
};

const object3 = {
  content: {
    data: {
      key: 'group2',
      type: 'deleted',
      value: { before: { abc: 12345 } },
    },
    meta: {
      ancestry: [],
      nodeType: 'leaf',
    },
  },
  children: [],
};

const object4 = {
  content: {
    data: {
      key: 'group3',
      type: 'added',
      value: { after: { fee: 100500 } },
    },
    meta: {
      ancestry: [],
      nodeType: 'leaf',
    },
  },
  children: [],
};

export default [object1, object2, object3, object4];
