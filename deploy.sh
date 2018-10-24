#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build:prod

# 进入生成的文件夹
cd dist

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

git push -f "https://github.com/umi-soft/element-admin.git" master:gh-pages

cd -
