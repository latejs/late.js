import chalk from 'chalk';
import { ProgressPlugin, type Compiler } from 'webpack';
import log from 'log-update';

const thresholder = 0.99;

function now() {
  return new Date().toTimeString().split(' ')[0];
}

interface ProgressPluginOptions {
  /**
   * Show active modules count and one active module in progress message.
   */
  activeModules?: boolean;
  /**
   * Show dependencies count in progress message.
   */
  dependencies?: boolean;
  /**
   * Minimum dependencies count to start with. For better progress calculation. Default: 10000.
   */
  dependenciesCount?: number;
  /**
   * Show entries count in progress message.
   */
  entries?: boolean;
  /**
   * Function that executes for every progress step.
   */
  handler?: (percentage: number, msg: string, ...args: string[]) => void;
  /**
   * Show modules count in progress message.
   */
  modules?: boolean;
  /**
   * Minimum modules count to start with. For better progress calculation. Default: 5000.
   */
  modulesCount?: number;
  /**
   * Collect percent algorithm. By default it calculates by a median from modules, entries and dependencies percent.
   */
  percentBy?: null | 'entries' | 'modules' | 'dependencies';
  /**
   * Collect profile data for progress steps. Default: false.
   */
  profile?: null | boolean;
}

type Options =
  | ProgressPluginOptions
  | ((percentage: number, msg: string, ...args: string[]) => void);

function isEqual(arr1?: string[], arr2?: string[]) {
  if (!arr1?.length || arr2?.length) {
    return false;
  }
  let equal = arr1?.length === arr2?.length;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2?.[i]) {
      equal = false;
      break;
    }
  }
  return equal;
}

class Progress {
  delegate: ProgressPlugin | null = null;
  constructor(options: Options) {
    this.delegate = new ProgressPlugin(options);
  }
  apply(compiler: Compiler) {
    this?.delegate?.apply(compiler);

    compiler.hooks.invalid.tap('ProgressWebpckPlugin', () => {
      console.log(chalk.white('Compiling...'));
    });
  }
}

interface ProgressOptions {
  minimal?: boolean; // enable minimal mode or not,default value is false
  identifier?: string; // identifier of webpack bundle
  onStart?: () => void; // callback function when webpack bundler started
  onFinish?: (time: string, duration: string) => void; // callback function when webpack bundler finished
  onProgress?: (output: string[], per: number) => void; // callback function when webpack bundler running
  clear?: boolean; // whether clear console when webpack bundler finished
  color?: string;
}

function webpackBarPlugin(options?: ProgressOptions) {
  let {
    onStart,
    onFinish,
    onProgress,
    clear = true,
    color = '#5fe5de',
  } = options || {};
  let coloring = onProgress === undefined;
  let startTime = 0;
  let finishTime = 0;
  let duration;

  let prev: { percentage?: number; message?: string; args?: string[] } = {};
  const handler = (percentage: number, message: string, ...args: string[]) => {
    let output: string[] = [];
    if (percentage > thresholder) {
      return;
    }

    if (percentage <= 0.03) {
      startTime = Date.now();
      // 开始
      onStart?.();
    }
    if (percentage > 0 && percentage < thresholder) {
      if (message === '') return;
      if (
        prev.percentage === percentage &&
        prev.message === message &&
        isEqual(prev?.args, args)
      ) {
        return;
      }
      prev = { percentage, message, args };

      const banner = `(${Math.round(percentage * 100)}%) `;
      output.push(coloring ? `${chalk.hex(color)(banner)}` : banner);
      output.push(coloring ? chalk.white(`${message}`) : `${message}`);

      if (args.length > 0) {
        let details = args.join(' ');
        output.push(coloring ? chalk.grey(`(${details})`) : `(${details})`);
      }
    }

    if (percentage >= thresholder) {
      finishTime = Date.now();
      duration = (finishTime - startTime) / 1000;
      duration = duration.toFixed(3);
      if (typeof onFinish === 'function') {
        onFinish?.(now(), duration);
      } else {
        output.push(
          coloring
            ? chalk.white(`Build finished at ${now()} by ${duration}s`)
            : `Build finished at ${now()} by ${duration}s`,
        );
      }
    }
    if (onProgress) {
      if (percentage > 0 && percentage < thresholder) {
        onProgress?.(output, percentage);
      }
    } else {
      log(output.join(''));
      if (percentage === thresholder) {
        if (clear) {
          log.clear();
        } else {
          log.done();
        }
      }
    }
  };
  return new Progress({
    handler,
    entries: false,
    activeModules: false,
    modules: true,
    modulesCount: 5000,
    dependencies: false,
    dependenciesCount: 10000,
    percentBy: 'entries',
  });
}

export { webpackBarPlugin };
