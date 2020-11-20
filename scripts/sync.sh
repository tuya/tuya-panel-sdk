#!/bin/bash
var=$(git remote get-url origin)
echo $var
if [ $var != 'https://github.com/tuya/tuya-panel-sdk.git' ]
then
  git fetch origin
  git remote add github https://github.com/tuya/tuya-panel-sdk.git
  git commit -am "chore(sync): sync sdk from gitlab"
  git push github sync -f
  git push origin sync -f
  git remote rm github
else
  echo -e "\033[31mERROR: 该命令只能在内部仓库执行\033[0m"
  exit 1
fi
