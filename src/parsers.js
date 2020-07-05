import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (text, extname) => {
  if (!_.has(parsers, extname)) {
    throw new Error(`extension ${extname} not supported`);
  }

  const parse = parsers[extname];
  return parse(text);
};
