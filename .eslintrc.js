module.exports = {
  root: true,
  globals: {
    document: true,
    localStorage: true,
    window: true,
    env: true,
    globalThis: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  //扩展配置，加一些插件 *
  extends: [
    "plugin:prettier/recommended", //使用Prettier
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint"],
  //优先级低于parse的语法解析配置
  parserOptions: {
    parser: "@typescript-eslint/parser", // 解析 .ts 文件
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
    "@typescript-eslint/no-non-null-assertion": 0, //允许使用!断言
    "@typescript-eslint/ban-ts-comment": 0, // 允许使用// @ts-ignore
    "@typescript-eslint/no-explicit-any": 0,
    "no-dupe-keys": 0,
    "@typescript-eslint/no-var-requires": 0, //允许require
  },
};
