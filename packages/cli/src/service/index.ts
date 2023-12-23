import Webpack, { type Configuration } from 'webpack';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import { devConfig } from './dev';
import { buildConfig } from './build';
import log from '../utils/log';
import { setEnv, EnvType } from './env';
import { Config, readConfig, updateConfig } from './config';
import { parseBuildEnv } from './utils/parse-build-env';
import { printInstructions } from './utils/printIn-structions';
import { getPort } from './utils/get-port';

export interface ServiceConfiguration {
  env?: EnvType;
  nodeEnvType?: string;
}

class Service {
  constructor({ env, nodeEnvType }: ServiceConfiguration) {
    // 设置环境变量
    setEnv(env, nodeEnvType);
    // 读取配置
    readConfig();
    // 根据env解析一些配置
    parseBuildEnv(env);
  }
  async start() {
    log.mainInfo('Starting dev server...');

    // 读取port
    const port = await getPort({ port: Config.devServer?.port! });
    // 更新devServer的port
    updateConfig({
      devServer: {
        port,
      },
    });

    const mainDevConfig = merge(
      devConfig(),
      Config?.configureWebpack!,
    ) as Configuration;

    
    const compiler = Webpack(mainDevConfig);

    let isFirstCompilation = false;
    let time = 0;

    compiler.hooks.compile.tap('compile', () => {
      time = Date.now();
    });

    compiler.hooks.done.tap('done', async () => {
      if (!isFirstCompilation) {
        printInstructions(Config.devServer?.port!, `${Date.now() - time}`);
        isFirstCompilation = true;
      }
    });

    process.on('SIGINT', () => {
      process.exit();
    });
  
    const server = new WebpackDevServer(Config.devServer, compiler);
    await server.start();
  }
  async build() {
    log.mainInfo('Build Start...');
    const mainBuildConfig = merge(
      buildConfig(),
      Config?.configureWebpack!,
    ) as Configuration;
    Webpack(mainBuildConfig, (err, stats) => {
      if (err) {
        log.error(err.message);
        process.exit(1);
      }
      if (stats?.hasErrors()) {
        const info = stats.toJson({
          colors: true,
        });
        info?.errors?.forEach((item) => {
          log.error(item.message);
        });
        process.exit(1);
      }
      log.success(
        `Build Success In ${stats?.endTime - stats?.startTime} ms.\n`,
      );
      if (mainBuildConfig?.watch) {
        log.mainInfo(`Watch...\n`);
        return;
      }
      process.exit();
    });
    // compiler.watch({}, );
  }
}

export default Service;
