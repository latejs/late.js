import { join } from 'path';
import getCwd from './get-cwd';

export default (dir?: string) => {
  if (dir) {
    try {
      return require(join(dir, 'package.json'));
    } catch (err) {}
  } else {
    try {
      return require(join(getCwd(), 'package.json'));
    } catch (error) {}
  }
};
