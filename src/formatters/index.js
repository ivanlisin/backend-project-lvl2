import _ from 'lodash';
import convertDiffToStylish from './stylish';
import convertDiffToPlain from './plain';

const formatters = {
  stylish: convertDiffToStylish,
  plain: convertDiffToPlain,
  json: JSON.stringify,
};

export default (diff, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`format ${format} not supported`);
  }

  const render = formatters[format];
  return render(diff);
};
