#!/bin/bash
origin=$(git remote get-url origin)
branch=$(git branch | grep "*")
if [[ $origin = 'https://registry.code.tuya-inc.top/TuyaRN/tuya-native-elements.git' && $branch = '* sync' ]]
then
  git fetch origin sync
  git remote add github https://github.com/tuya/tuya-panel-sdk.git
  git push github sync -f
  git push origin sync -f
else
  echo -e "\033[31mERROR:  请在内部仓库的 sync 分支执行该脚本\033[0m"
  exit 1
fi
