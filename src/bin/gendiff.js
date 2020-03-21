#!/usr/bin/env node

import { program } from 'commander';
import { description, version } from '../../package.json';

program
  .arguments('<firstConfig> <secondConfig>')
  .description(description)
  .version(version)
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
