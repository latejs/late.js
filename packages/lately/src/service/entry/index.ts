import fs from 'fs';
import { Configuration } from 'webpack';
import { SrcEnteryPath } from '../constant';
import { Config } from '../config';
import { mulitPages } from '../utils/mulit-pages';
import getCwd from '../../utils/get-cwd';
import log from '../../utils/log';

export const entry = (): Configuration['entry'] => {
 
  if (Config.pages && Object.keys(Config.pages).length) {
    
    return mulitPages().entry;
  } else {
    let entries = SrcEnteryPath;
    if (!fs.existsSync(SrcEnteryPath)) {
      const EntryIndex = [
        'src/index.js',
        'src/main.js',
        'src/index.ts',
        'src/index.tsx',
        'src/main.tsx',
      ];
      let resolvedPath = '';
      for (const filename of EntryIndex) {
        const filePath = getCwd(filename);
        if (!fs.existsSync(filePath)) continue;
        resolvedPath = filePath;
        break;
      }
      if (!resolvedPath) {
        log.error(`Unable to find the entry file：${EntryIndex.join(' or ')}`);
        throw Error();
      }
      entries = resolvedPath;
    }
    return entries;
  }
};
