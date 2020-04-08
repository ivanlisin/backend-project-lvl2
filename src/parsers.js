import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getText = (pathToFile) => {
  const absolutePath = path.resolve(pathToFile);
  return fs.readFileSync(absolutePath, 'utf-8');
};

export const parseJson = (pathToJson) => JSON.parse(getText(pathToJson));

export const parseYaml = (pathToYaml) => yaml.safeLoad(getText(pathToYaml));
