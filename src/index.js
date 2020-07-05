import path from 'path';
import fs from 'fs';
import parse from './parsers';
import { makeDiff } from './diff';
import render from './formatters';

const makeObject = (filepath) => {
  const text = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const extname = path.extname(path.basename(filepath)).slice(1);
  return parse(text, extname);
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const object1 = makeObject(filepath1);
  const object2 = makeObject(filepath2);
  const diff = makeDiff(object1, object2);
  return render(diff, outputFormat);
};

export default genDiff;
