import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import chalk from 'chalk';
import { type Stats, type Asset } from 'webpack';
import cliui from 'cliui';
import log from '../../utils/log';

const ui = cliui({ width: process.stdout.columns || 80 });

export const formatSize = (size: number): string => {
  if (String(size)?.length <= 3) {
    return `${size}B`;
  } else if (String(Math.floor(size / 1024))?.length <= 3) {
    return `${(size / 1024).toFixed(2)}KB`;
  } else if (String(Math.floor(size / 1024 / 1024))?.length <= 3) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  } else if (String(Math.floor(size / 1024 / 1024 / 1024))?.length <= 3) {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
  } else if (
    String(Math.floor(size / 1024 / 1024 / 1024 / 1024))?.length <= 3
  ) {
    return `${(size / 1024 / 1024 / 1024 / 1024).toFixed(2)}TB`;
  } else {
    return `${size}B`;
  }
};

export function formatStats(stats: Stats, dir: string) {
  
  const json = stats.toJson({
    hash: false,
    modules: false,
    chunks: false,
  });

  let assets = json.assets
    ? json.assets
    : json?.children?.reduce((acc, child) => acc.concat(child.assets), []);

  const seenNames = new Map();
  const isJS = (val: string) => /\.js$/.test(val);
  const isCSS = (val: string) => /\.css$/.test(val);
  const isMinJS = (val: string) => /\.min\.js$/.test(val);

  assets = assets
    ?.map((a: Asset) => {
      a.name = a.name.split('?')[0];
      return a;
    })
    .filter((a: Asset) => {
      if (seenNames.has(a.name)) {
        return false;
      }
      seenNames.set(a.name, true);
      return isJS(a.name) || isCSS(a.name);
    })
    .sort((a: Asset, b: Asset) => {
      if (isJS(a.name) && isCSS(b.name)) return -1;
      if (isCSS(a.name) && isJS(b.name)) return 1;
      if (isMinJS(a.name) && !isMinJS(b.name)) return -1;
      if (!isMinJS(a.name) && isMinJS(b.name)) return 1;
      return b?.info?.size! - a?.info?.size!;
    });

  function getGzippedSize(asset: Asset) {
    const filepath = path.resolve(path.join(dir, asset.name));
    const buffer = fs.readFileSync(filepath);
    return formatSize(zlib.gzipSync(buffer).length);
  }

  function makeRow(a: string, b: string, c: string) {
    return `${a}\t  ${b}\t ${c}`;
  }

  ui.div(
    makeRow(
      chalk.cyan.bold(`File`),
      chalk.cyan.bold(`Size`),
      chalk.cyan.bold(`Gzipped`),
    ) +
      `\n\n` +
      assets
        ?.map((asset: Asset) =>
          makeRow(
            /js$/.test(asset.name)
              ? chalk.green(path.join(dir, asset.name))
              : chalk.blue(path.join(dir, asset.name)),
            formatSize(asset?.info.size!),
            getGzippedSize(asset),
          ),
        )
        .join(`\n`),
  );

  const time = stats.endTime - stats.startTime;
  const now = new Date().toLocaleDateString();
  const hash = stats.hash;
  const info = `Build at: ${chalk.white(now)} - Hash: ${chalk.white(
    hash,
  )} - Time: ${chalk.white(time)}ms`;

  return `${ui.toString()}\n\n  ${chalk.gray(
    `Images and other types of assets omitted.`,
  )}\n  ${info}\n`;
}
