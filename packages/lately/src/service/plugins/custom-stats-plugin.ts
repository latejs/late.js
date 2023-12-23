import { type Compiler, type Stats } from 'webpack';
// import boxen from 'boxen';

import { Config } from '../config';
import { formatStats } from '../utils/format-stats';

class CustomStatsPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.done.tap('CustomStatsPlugin', (stats: Stats) => {
      const statsTemplate = formatStats(stats, Config.outputDir!);
      // const statsMessage = boxen(statsTemplate, {
      //   padding: { left: 2, right: 2, top: 0, bottom: 0 },
      //   align: 'left',
      //   borderStyle:'classic',
      //   borderColor: 'gray',
      // });
      console.log(statsTemplate);
    });
  }
}

export { CustomStatsPlugin };
