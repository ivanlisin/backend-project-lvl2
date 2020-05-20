import _ from 'lodash';

const add = (acc, property, state, value) => {
  const hasProperty = acc.find(([currentProperty]) => currentProperty === property);
  if (!hasProperty) {
    return [...acc, [property, state, value]];
  }
  return acc.map(([currentProperty, currentState, currentValue]) => {
    if (currentProperty !== property) {
      return [currentProperty, currentState, currentValue];
    }
    return [currentProperty, [currentState, state].join(' '), currentValue, value];
  });
};

const convert = (obj, ancestry = []) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];

    const isChanged = key.startsWith('-') || key.startsWith('+');
    if (isChanged) {
      const [state, name] = key.split(' ');
      const property = [...ancestry, name].join('.');
      return add(acc, property, state, value);
    }

    if (_.isObject(value)) {
      const child = value;
      const result = convert(child, [...ancestry, key]);
      acc.push(...result);
      return acc;
    }

    return acc;
  }, []);
};

const validation = (value) => (Array.isArray(value) || _.isObject(value) ? '[complex value]' : value);

export default (diff) => {
  const list = convert(diff);
  return list
    .map((item) => {
      const [property, state, value1, value2] = item;
      if (state === '-') {
        return `Property ${property} was deleted`;
      }
      if (state === '+') {
        return `Property ${property} was added with value: ${validation(value1)}`;
      }
      return `Property ${property} was changed from ${validation(value1)} to ${validation(value2)}`;
    })
    .join('\n');
};
