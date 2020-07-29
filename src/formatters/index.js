import _ from 'lodash';
import renderLikeStylish from './stylish';
import renderLikePlain from './plain';

const formatters = {
  stylish: renderLikeStylish,
  plain: renderLikePlain,
  json: JSON.stringify,
};

const render = (diffTree, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`format ${format} not supported`);
  }

  const renderLikeFormat = formatters[format];
  return renderLikeFormat(diffTree);
};

export default render;
