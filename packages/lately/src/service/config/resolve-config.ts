import fs from 'fs';
import { buildSync } from 'esbuild';
import log from '../../utils/log';
import { updateConfig } from '../config';
import getCwd from '../../utils/get-cwd';

export const resolveConfig = (resolvedPath: string) => {
  const result = buildSync({
    entryPoints: [resolvedPath],
    outfile: 'config.js',
    write: false,
    platform: 'node',
    format: 'cjs',
    sourcemap: 'inline',
    target: 'es6',
  });
  const { text: code } = result.outputFiles[0];
  const fileBase = `${getCwd('node_modules')}.${Math.floor(Math.random() * 100)}`;
  const fileNameTmp = `${fileBase}.js`;
  fs.writeFileSync(fileNameTmp, code);
  try {
    const config = require(fileNameTmp)?.default || {};
    updateConfig(config);
  } catch (error: any) {
    log.error(error?.toString());
  } finally {
    fs.unlink(fileNameTmp, () => {});
  }
};
