#!/usr/bin/env node

import { program } from 'commander';
import { description, version } from '../../package.json';
import genDiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description(description)
  .version(version)
  .option('-f, --format [type]', 'output format')
  .action((path1, path2) => console.log(genDiff(path1, path2)))
  .parse(process.argv);
