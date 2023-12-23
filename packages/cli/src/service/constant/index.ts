import path from 'path';
import getCwd from '../../utils/get-cwd';

// 根路径
export const RootPath = getCwd();

// package配置
export const Pkg = getCwd('package.json');

// tscongig配置
export const TsConfigPath = getCwd('tsconfig.json');

// 第三方包路径
export const NodeModulesPath = getCwd('node_modules');

export const EslintCachePath = path.join(NodeModulesPath, '.cache/eslint');

// 打包前文件存放路径
export const SrcPath = getCwd('src');

// assets资源
export const AssetsPath = getCwd('assets');

// 打包前的主路径
export const SrcEnteryPath = getCwd('src/main.ts');

// 打包后文件存放路径
export const DistPath = getCwd('dist');

// 静态文件目录
export const StaticDir = getCwd('public');

// html模板地址
export const HtmlTemplatePath = getCwd('index.html');


