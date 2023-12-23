import ip from 'ip';
import chalk from 'chalk';
import log from '../../utils/log';
import { Config } from '../config';

const printInstructions = (port: string | number, time?: string) => {
  log.mainInfo(`Ready in ${time} ms`);
  console.log();
  console.log(`  App running at:`);
  console.log();
  console.log(
    `  ${chalk.green('➔ ')}${chalk.white.bold(`Local:`)}   ${chalk.cyan(
      'http://localhost:',
    )}${chalk.green(port)}${Config.publicPath}`,
  );
  console.log(
    `  ${chalk.green('➔ ')}${chalk.white.bold(`Network:`)} ${chalk.cyan(
      `http://${ip.address()}`,
    )}:${chalk.green(port)}${Config.publicPath}`,
  );
  console.log();
};
export { printInstructions };
