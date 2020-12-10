#!/bin/bash
origin=$(git remote get-url origin)
branch=$(git branch | grep "*")
if [[ $origin = 'https://registry.code.tuya-inc.top/TuyaRN/tuya-native-elements.git' && $branch = '* sync' ]]
then
  git fetch origin sync
  git remote add github https://github.com/tuya/tuya-panel-sdk.git
  # git reset --soft 6b7e211d607bf9a7f008c6aeebea6d9360b9828c
  git rm --cached scripts/sync-from-github.sh scripts/sync.sh
  git update-index --assume-unchanged scripts/sync-from-github.sh scripts/sync.sh
  git commit -m "chore: sync gitlab to github" --no-verify
  git push github sync -f
  git add .
  git commit -m "chore: sync gitlab to github" --no-verify
  git push origin sync -f
  git remote rm github
else
  echo -e "\033[31mERROR:  请在内部仓库的 sync 分支执行该脚本\033[0m"
  exit 1
fi
