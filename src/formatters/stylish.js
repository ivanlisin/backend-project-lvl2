import _ from 'lodash';

const align = (item, depth) => {
  const indent = `  ${'    '.repeat(depth)}`;
  const [state] = item.split(' ');
  return state === '-' || state === '+'
    ? `${indent}${item}`
    : `${indent}  ${item}`;
};

const convert = (obj, depth = 0) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];

    if (_.isObject(value)) {
      const child = value;
      const lines = convert(child, depth + 1);
      acc.push(`${align(key, depth)}: {`, ...lines, `${align('}', depth)}`);
      return acc;
    }
    const pair = `${key}: ${value}`;
    const line = `${align(pair, depth)}`;
    acc.push(line);
    return acc;
  }, []);
};

export default (diff) => {
  const lines = convert(diff);
  const text = lines.join('\n');
  return `{\n${text}\n}`;
};
