import semver from 'semver';
import log from './log';

const checkNodeVersion = async (wanted: string, id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (
      !semver.satisfies(process.version, wanted, { includePrerelease: true })
    ) {
      log.error(
        `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.\nPlease upgrade your Node version.`,
      );

      reject();
      process.exit(1);
    }
    resolve();
  });
};

export default checkNodeVersion;
