import _ from 'lodash';
import toStylish from './stylish';

const formatters = {
  stylish: toStylish,
};

export default (diff, type) => {
  if (!_.has(formatters, type)) {
    throw new Error(`${type} not supported`);
  }

  const format = formatters[type];
  return format(diff);
};
