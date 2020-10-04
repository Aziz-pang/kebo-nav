# 浏览地址
🛑🛑 效果预览地址 ↓  

https://aziz-pang.github.io/kebo-nav/dist/index.html


## 开发
yarn global add parcel-bundler
parcel src/index.html

## build 命令

由于 parcel 不支持svg，需要在 build 的时候加上`--no-minify`
```sh
parcel build src/index.html --no-minify --public-url . 
```

## 一键发布
```sh
#初始化
yarn init -y
#添加脚本
"scripts": {
    "build":"rm -rf dist && parcel build src/index.html --no-minify --public-url ./"
  },
```

添加完以上的代码即可，一键发布
```sh
yarn build
```

## 删除时抖动效果

csshake-GitHub主页:https://github.com/elrumordelaluz/csshake
主页:https://elrumordelaluz.github.io/csshake/
