# backend-project-lvl2

![Node CI](https://github.com/iFoxMan/backend-project-lvl2/workflows/Node%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/0049aa7860f7974ffdf6/maintainability)](https://codeclimate.com/github/iFoxMan/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0049aa7860f7974ffdf6/test_coverage)](https://codeclimate.com/github/iFoxMan/backend-project-lvl2/test_coverage)

Compares two configuration files and shows a difference

- [backend-project-lvl2](#backend-project-lvl2)
  - [Installation](#installation)
    - [github](#from-github)
    - [npm](#from-npm)
  - [Input data](#input-data)
  - [Output data](#output-data)
    - [stylish](#stylish)
    - [plain](#plain)
    - [json](#json)
  
## Installation

### from github

```console
git clone https://github.com/iFoxMan/backend-project-lvl2

cd backend-project-lvl2

make install

make build

npm link .
```

[![asciicast](https://asciinema.org/a/UE7BJleClQGHamd17PiHbR34G.svg)](https://asciinema.org/a/UE7BJleClQGHamd17PiHbR34G)

### from npm

```console
npm install -g backend-project-lvl2-ifoxman
```

[![asciicast](https://asciinema.org/a/KijO3BY3WagUldlEDOpEUc3iD.svg)](https://asciinema.org/a/KijO3BY3WagUldlEDOpEUc3iD)

## Input data

gendiff support json, yml and ini files.
For example these file pairs.

```json
// before.json
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345
  }
}

// after.json
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "fee": 100500
  }
}
```

```yml
// before.yml
---
common:
  setting1: 'Value 1'
  setting2: 200
  setting3: true
  setting6:
    key: 'value'

group1:
  baz: 'bas'
  foo: 'bar'
  nest:
    key: 'value'

group2:
  abc: 12345

// after.yml
---
  common:
    follow: false
    setting1: "Value 1"
    setting3:
      key: "value"
    setting4: "blah blah"
    setting5:
      key5: "value5"
    setting6:
      key: "value"
      ops: "vops"
  
  group1:
    foo: "bar"
    baz: "bars"
    nest: "str"
  
  group3:
    fee: 100500

```

```ini
// before.ini
[common]
setting1 = "Value 1"
setting2 = '200'
setting3 = 'true'
[common.setting6]
key = "value"

[group1]
baz = "bas"
foo = "bar"
[group1.nest]
key = "value"

[group2]
abc = '12345'

// after.ini
[common]
follow = 'false'
setting1 = "Value 1"
setting4 = "blah blah"
[common.setting3]
key = "value"
[common.setting5]
key5 = "value5"
[common.setting6]
key = "value"
ops = "vops"

[group1]
foo = "bar"
baz = "bars"
nest = "str"

[group3]
fee = '100500'
```

## Output data

gendiff support stylish, plain and json format.
For example these.

### stylish

```console
gendiff before.json after.json
```

or

```console
gendiff --format stylish before.json after.json
```

[![asciicast](https://asciinema.org/a/VjPqmsroHdzrnzKtjy1SIsnDP.svg)](https://asciinema.org/a/VjPqmsroHdzrnzKtjy1SIsnDP)

### plain

```console
gendiff --format plain before.yml after.yml
```

[![asciicast](https://asciinema.org/a/EBEEpFGbRF2KT7Uu9gFq3BDlW.svg)](https://asciinema.org/a/EBEEpFGbRF2KT7Uu9gFq3BDlW)

### json

```console
gendiff --format json before.ini after.ini
```

[![asciicast](https://asciinema.org/a/xnXYmKeWPD5eTIltDL3zdpDLo.svg)](https://asciinema.org/a/xnXYmKeWPD5eTIltDL3zdpDLo)
