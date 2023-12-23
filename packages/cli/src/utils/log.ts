import chalk from 'chalk';

const error = (str: string) => {
  console.log(chalk.red(`${str}`));
};

const info = (str: string) => {
  console.log(chalk.cyan(`${str}`));
};

const mainInfo = (str: string) => {
  console.log(`${chalk.hex('#409eff')(`Info`)} ${str}`);
};

const warn = (str: string) => {
  console.log(`${chalk.yellow(`Warn`)} ${str}`);
};

const success = (str: string) => {
  console.log(`${chalk.green(`Done`)} ${str}`);
};

export default {
  info,
  error,
  warn,
  success,
  mainInfo,
};
