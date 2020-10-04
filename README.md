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

<br />
---

## 设计思路

### UI设计

目前支持
1. google搜索
2. 添加和删除网址收藏
3. shift + [网站首字母] 可快速跳转

下一步打造的功能
1. 网址可以组合成文件夹
2. 搜索结果添加多个搜索引擎的定义
3. 添加「微博」「知乎」等热榜名单
4. 自定义背景

![kobe-nav2.0](https://18620893020-1301866726.cos.ap-guangzhou.myqcloud.com/20201005004829.jpg)

### 前端实现思路

使用「哈希表」存储数据，目前数据结构有两个参数
```js
const hashMap = kobeUrl || [
    { logo: 'A', url: '//apple.cn' },
    { logo: 'G', url: '//google.com' }
];
```

利用JS动态添加DOM，利用`window.open`添加跳转链接，同时需要在css里添加`cursor: pointer;`，告诉用户这是可点击跳转的链接
```js
const $siteList = $('.siteList');
    $siteList.find('li').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li class="sites columnMiddle" data-id=${index}>
            <div class="logo columnMiddle">${node.logo[0]}</div>
            <span class="site-name">${simplifyUrl(node.url)}</span>
            </li>`).appendTo($siteList)
        $li.on('click', () => {
            window.open(node.url, "_self")
    });
```

通过用户离开浏览器触发事件，令文件保存在本地，下一次可获取文件重新渲染
```js
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('_kobeUrl', string)  //将哈希表转为字符串保存在本地
}

//下一次进入网址时再次获取哈希表并转为对象
const _kobeUrl = localStorage.getItem('_kobeUrl')
const kobeUrl = JSON.parse(_kobeUrl)
```

**css和js在服务器端有缓存**，对文件添加参数可强制更新，如：
```html
<link rel="stylesheet" href="csshake/dist/csshake.css?version1.0">
```