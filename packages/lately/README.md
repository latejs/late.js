## @latelyjs/lately

需要在项目根目录执行 `lately` 命令，输入`lately -h`则可以看到如下信息：

```
Options:
  -V, --version    output the version number
  -h, --help       display help for command

Commands:
  dev [options]    alias of "npm run dev" in the current project
  build [options]  alias of "npm run build" in the current project
  lint             alias of "npm run lint" in the current project
  help [command]   display help for command
  Run lately <command> --help for detailed usage of given command.
```

### lately dev

启动本地开发服务器进行项目的开发调试。


比如：

```bash
lately dev
```

### lately build

编译构建 web 产物。


比如：

```
lately build
```

### lately help

打印帮助文档。
比如：

```bash
lately help
```

### 配置文件

根目录创建  lately.config.ts

```ts

import { defineConfig } from '@latelyjs/lately';

export default defineConfig({

})
```