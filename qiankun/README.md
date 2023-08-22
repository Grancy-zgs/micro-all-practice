使用 pnpm 安装依赖，需要先启动主应用，再启动子应用

# 项目结构介绍

## 当前项目目录如下

    ├── common/                # 存放共用的工具库
    ├── monorepo/              # 存放公共的组件库 使用monorepo进行管理
    ├── main-vite-app-ts/      # 存放主应用 main-vite-app-ts 的文件夹
    |── webpack-app/           # 存放微应用 webpack-app 的文件夹
    |── map-app/               # 存放微应用 map-app 的文件夹
    |—— test-vite-app-ts       # 存放vite微应用 使用vite-plugin-legacy-qiankun插件 资源加载有问题 还不能显示页面 该插件使用人数较少 使用方法不是很详细 但解决了css和js沙箱的问题
    |—— vite-test-plugin       # 存放vite微应用 使用vite-plugin-qiankun插件(比较主流 但未解决css沙箱和js沙箱问题) 已经可以显示页面了 但页面样式有些问题
    |—— docs                   # 文档
      |—— qiankun.conf           # 项目部署的nginx基础配置文件
      |—— build.sh               # 通过脚本对主应用和子应用进行统一的打包

## 还需解决的问题

1. 试验 vite 项目的 js 和 css
2. 使用的是 hash 路由，后续需要考虑是否换成 history 路由
3. 是否要结合 monorepo 管理项目，主要好处是可以一键启动所有项目，但集成 monorepo + qiankun 有点重, 可能也不是太必要
4. 是否要将 common 中的内容转移到 monorepo 中

## 原作者 github 地址

https://github.com/aehyok/vue-qiankun/blob/dev/docs/qiankun.md
