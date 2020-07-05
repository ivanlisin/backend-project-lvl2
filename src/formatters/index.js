import _ from 'lodash';
import { makeRenderFn } from '../diff';
import convertTreeToStylish from './stylish';
import convertTreeToPlain from './plain';

const formatters = {
  stylish: makeRenderFn(convertTreeToStylish, (texts) => ['{', texts.join('\n'), '}'].join('\n')),
  plain: makeRenderFn(convertTreeToPlain, (texts) => texts.join('\n')),
  json: JSON.stringify,
};

export default (diff, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`format ${format} not supported`);
  }

  const render = formatters[format];
  return render(diff);
};
