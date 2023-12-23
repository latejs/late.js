import { ESLint } from 'eslint';
import getCwd from './utils/get-cwd';
import log from './utils/log';
import Service, { ServiceConfiguration } from './service';

const dev = ({ env, nodeEnvType }: ServiceConfiguration) => {
  new Service({ env, nodeEnvType }).start();
};

const build = ({ env, nodeEnvType }: ServiceConfiguration) => {
  new Service({ env, nodeEnvType }).build();
};

const lint = async () => {
  const linter = new ESLint({ fix: true });
  try {
    const results = await linter.lintFiles([
      getCwd(`src/**/*.ts`),
      getCwd(`src/**/*.tsx`),
      getCwd(`src/**/*.vue`),
    ]);
    await ESLint.outputFixes(results);
    const formatter = await linter.loadFormatter('stylish');
    const resultText = formatter.format(results);
    console.info(resultText);
  } catch (error) {
    log.error(`Linting failed:${error}`);
  }
};

export default {
  dev,
  build,
  lint,
};
