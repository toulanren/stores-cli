# 仓库管理工具

有时候我们会自己搭建模板仓库，后续新项目使用此模板仓库构建；可能会由此衍生出多个项目，类似于 GitHub 的 Fork 功能。

当我们的模板仓库的功能更新时，希望同步到我们的项目中，同步起来比较麻烦；而此工具则旨在解决此问题。

我们可自行配置模板仓库，当功能更新时，一键同步代码。

## 安装

- npm i stores-cli -g

## 配置模板仓库

在用户根目录（process.env.HOME）下添加文件：.stores-cli.json

参考此配置：

```json
[
  {
    "title": "cli 基础目录", // 仓库名称
    "type": "cli-base", // 仓库类型
    "repo": "xxxxxx", // 仓库 clone 地址
    "branch": "prod" // 仓库主分支
  }
]
```

## 命令

### 新建项目

- store create [folder]

folder: 文件夹路径，默认为当前目录

### 更新项目版本

- store update

在使用 stores-cli 构建的项目的根目录下，使用此命令，可以获取远端版本的变动。
