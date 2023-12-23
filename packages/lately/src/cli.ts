import { program } from 'commander';
import chalk from 'chalk';
import leven from 'leven';
import pkg from '../package.json';
import loadCommand from './load-commander';
import log from './utils/log';

const initCli = async () => {
  // 显示版本号
  program.version(pkg.version);

  // 启动开发服务器
  program
    .command('dev')
    .option('--mode <mode>', 'Set the mode')
    .option('--config <config>', 'Set the config')
    .option('--PAGE <config>', 'Set the PAGE')
    .option('--page <config>', 'Set the page')
    .description('alias of "npm run dev" in the current project')
    .action((env) => {
      loadCommand.dev({
        env,
        nodeEnvType: 'development',
      });
    });
  // 启动生产build
  program
    .command('build')
    .option('--mode <mode>', 'Set the mode')
    .option('--target <target>', 'Set the library.type')
    .option('--name <name>', 'Set the library.name')
    .option('--config <config>', 'Set the config')
    .option('--PAGE <PAGE>', 'Set the PAGE')
    .option('--page <config>', 'Set the page')
    .option('--watch <watch>', 'Set the watch')
    .description('alias of "npm run build" in the current project')
    .action((env) => {
      loadCommand.build({
        env,
        nodeEnvType: 'production',
      });
    });
  // 格式化eslint
  program
    .command('lint')
    .description('alias of "npm run lint" in the current project')
    .action(() => {
      loadCommand.lint();
    });

  // 命令不存在时候提示
  program.on('command:*', ([cmd]) => {
    program.outputHelp();
    log.error(`Unknown command ${chalk.yellow(cmd)}.`);
    console.log();
    suggestCommands(cmd);
    process.exitCode = 1;
  });
  // 启动帮助信息
  program.on('--help', () => {
    log.info(
      `  Run ${chalk.cyan(
        `lately <command> --help`,
      )} for detailed usage of given command.`,
    );
  });

  program.parse(process.argv);
};

function suggestCommands(unknownCommand: any) {
  const availableCommands = program.commands.map((cmd) => cmd.name);

  let suggestion: any;

  availableCommands.forEach((cmd) => {
    const isBestMatch =
      leven(cmd?.name, unknownCommand) <
      leven(suggestion || '', unknownCommand);
    if (leven(cmd?.name, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
}

export { initCli };
