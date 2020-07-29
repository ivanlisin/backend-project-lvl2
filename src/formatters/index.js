import _ from 'lodash';
import renderStylish from './stylish';
import renderPlain from './plain';

const formatters = {
  stylish: renderStylish,
  plain: renderPlain,
  json: JSON.stringify,
};

const render = (diffTree, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`format ${format} not supported`);
  }
  const renderSelectedFormat = formatters[format];
  return renderSelectedFormat(diffTree);
};

export default render;
