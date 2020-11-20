#!/bin/bash
git fetch origin
git remote add github https://github.com/tuya/tuya-panel-sdk.git
git commit -am "chore(sync): sync sdk from gitlab"
git push github sync -f
git push origin sync -f
git remote rm github
