import { resolve } from 'path';
export default (dir?: string) => {
  const cwd = process.cwd();
  if (dir) {
    try {
      return resolve(cwd, dir);
    } catch (err) {}
  } else {
    try {
      return resolve(cwd);
    } catch (error) {}
  }
  return cwd;
};
