import _ from 'lodash';
import toStylish from './stylish';
import toPlain from './plain';

const formatters = {
  stylish: toStylish,
  plain: toPlain,
  json: JSON.stringify,
};

export default (diff, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`${format} not supported`);
  }

  const formalize = formatters[format];
  return formalize(diff);
};
