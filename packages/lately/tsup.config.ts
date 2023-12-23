import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    dts: true,
    format: ['cjs', 'esm'],
    sourcemap: !!options.watch,
    clean: true,
    minify: !options.watch,
    splitting: !options.watch,
    treeshake: true,
    legacyOutput: true,
    shims: false,
  };
});
