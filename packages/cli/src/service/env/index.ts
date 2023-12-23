import dotenv from 'dotenv';
import getCwd from '../../utils/get-cwd';

export interface BaseEnv {
  mode?: string;
  MODE?: string;
  NODE_ENV?: string;
  target?: string;
  name?: string;
  BUILD_TOOL?: string; // 主要用来表明是webpack
  config?: string; // 配置文件地址
  PAGE?: string;
  page?: string;
  watch?: boolean;
  progressColor?: string;
}

export type EnvType = BaseEnv & dotenv.DotenvConfigOutput;

export let envConfig: EnvType = {
  BUILD_TOOL: 'webpack',
};

export const getEnv = () => {
  return envConfig;
};

export const IsDev = () => {
  return envConfig.NODE_ENV === 'development';
};

const overrideEnv = (curEnv?: EnvType) => {
  envConfig = {
    ...envConfig,
    ...curEnv,
  };
};

const parseEnv = async (envPath: string) => {
  try {
    const curEnvConfig = dotenv.config({
      path: envPath,
      override: true,
    });
    overrideEnv(curEnvConfig.parsed);
  } catch {}
};

export const setEnv = async (env?: EnvType, nodeEnvType?: string) => {
  const mode = env?.mode || nodeEnvType;
  // 先初始化环境变量
  const engObj = {
    NODE_ENV: nodeEnvType,
    mode,
    MODE: mode,
    ...env,
  }
  overrideEnv(engObj);
  for(let key in engObj){
    // @ts-ignore
    process.env[key] = engObj[key];
  }
  if(env?.PAGE || env?.page){
    process.env.PAGE = env?.PAGE || env?.page;
    process.env.page = env?.PAGE || env?.page;
  }
  const modePath = getCwd(`.env.${mode}`);
  const defaultPath = getCwd(`.env`);
  await parseEnv(defaultPath);
  await parseEnv(modePath);
};
