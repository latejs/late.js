import path from 'path';
import { PagesConfig } from './types';

export function genHistoryApiFallbackRewrites(
  baseUrl: string = '',
  pages: PagesConfig = {},
) {
  const multiPageRewrites = Object.keys(pages)
    .sort((a, b) => b.length - a.length)
    .map((name) => ({
      from: new RegExp(`^/${name}`),
      to: path.posix.join(baseUrl, pages[name].filename || `${name}.html`),
    }));
  const pageRewrites = [
    ...multiPageRewrites,
    { from: /./, to: path.posix.join(baseUrl, 'index.html') },
  ];
  return pageRewrites;
}
