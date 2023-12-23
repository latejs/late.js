import fs from 'fs';
import { EnvType } from '../env';
import { updateConfig, Config } from '../config';
import { resolveConfig } from '../config/resolve-config';
import getCwd from '../../utils/get-cwd';

export const parseBuildEnv = (env?: EnvType) => {
  if (env?.target === 'lib' && env?.name) {
    
    updateConfig({
      filenameHashing: false,
      configureWebpack: {
        output: {
          filename: `${env.name}.umd.min.js`,
          path: Config.outputDir,
          library: `${env.name}`,
          libraryTarget: 'umd',
          publicPath: '',
          libraryExport: 'default',
        },
        externals : {
          vue: {
            root: "Vue",   //通过 script 标签引入，此时全局变量中可以访问的是 Vue
            commonjs: "vue",  //可以将vue作为一个 CommonJS 模块访问
            commonjs2: "vue",  //和上面的类似，但导出的是 module.exports.default
            amd: "vue"   //类似于 commonjs，但使用 AMD 模块系统
          }
        }
      },
      
    });
    if (env.watch) {
      updateConfig({
        configureWebpack: {
          watch: true,
          // watchOptions:{
          //   poll: 1000,
          //   aggregateTimeout: 500,
          //   ignored: /node_modules/
          // }
        },
      });
    }
  }

  if (env?.config) {
    if (fs.readFileSync(getCwd(env.config))) {
      resolveConfig(getCwd(env.config));
    }
  }
};
