## tuya-panel-sdk

<center><p align="center">
  <img src="https://img.shields.io/github/license/tuya/tuya-panel-sdk.svg" />
  <a href="http://commitizen.github.io/cz-cli/" target="_blank">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000" />
  </a>&nbsp;
  <a href="https://conventionalcommits.org" target="_blank">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000" />
  </a>&nbsp;
  <a href="https://codecov.io/gh/tuya/tuya-panel-sdk" target="_blank">
    <img src="https://codecov.io/gh/tuya/tuya-panel-sdk/graph/badge.svg" />
  </a>&nbsp;
  <img src="https://github.com/TuyaInc/tuya-panel-kit/workflows/Lint%20Code/badge.svg" />
</p>
</center>

## 组件发布脚本

> 以下脚本会按 `自动查询子包更新状态` -> `生成 changelog` -> `生成 git tag` -> `git push --follow-tags` -> `npm publish` 的顺序执行

### 发布预备版

```sh
$ yarn release:pre # bump 预备补丁版本，eg. 0.1.1-rc.0 -> 0.1.1-rc.1 or 0.1.0 -> 0.1.1-rc.0
$ yarn release:prepatch # 发布预备补丁版本，eg. 0.1.0 -> 0.1.1-rc.0
$ yarn release:preminor # 发布预备次要版本，eg. 0.1.0 -> 0.2.0-rc.0
$ yarn release:premajor # 发布预备主要版本，eg. 0.1.0 -> 1.0.0-rc.0
```

### 发布正式版

```shell
$ yarn release # 根据 conventional commits 自动 bump version
$ yarn release:patch # 发布补丁版本，eg. 0.0.1 -> 0.0.2
$ yarn release:minor # 布次要版本，eg. 0.0.1 -> 0.1.0
$ yarn release:major # 发布主要版本，eg. 0.0.1 -> 1.0.0
```
