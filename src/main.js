const { fork } = require("cluster");

const _kobeUrl = localStorage.getItem('_kobeUrl')
const kobeUrl = JSON.parse(_kobeUrl)

const hashMap = kobeUrl || [
    { logo: 'A', url: '//apple.cn' },
    { logo: 'G', url: '//google.com' }
];

const simplifyUrl = (url)=>{
    return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace('//', '')
        .replace(/\..*/, '')
}

const $siteList = $('.siteList');
const render = ()=>{
    $siteList.find('li').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li class="sites columnMiddle" data-id=${index}>
            <div class="logo columnMiddle">${node.logo[0]}</div>
            <span class="site-name">${simplifyUrl(node.url)}</span>
            </li>`).appendTo($siteList)
            $li.on('click', ()=>{
            window.open(node.url, "_self")
        })
    });
    let listLength = $('.siteList').find('li').length
    const listLayout  = ()=>{
        const $li = $(`<li class="sites columnMiddle notli" style="opacity: 0;width:70px;cursor: auto;"></li>`).appendTo($siteList)
        listLength = $('.siteList').find('li').length
    }
    while(listLength % 4 !== 0){
        listLayout()
    }
    while(listLength % 5 !== 0){
        listLayout()
    }
}
$('.delButton')
    .on('click', () => {
        const $li = $('.siteList').find('li')
        $li.toggleClass("shake-rotate shake-constant shake-constant--hover opacity")
        $li.unbind('click').not($('.notli')).on('click',(e)=>{
            if (window.confirm("确定删除该网址吗？")) {
                const siteIndex = e.currentTarget.dataset.id
                hashMap.splice(siteIndex,1)
                render()
            }else render()
        })
    })
    
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入您要添加的网址');
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(), 
            url : url
        })
        render()
    });

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('_kobeUrl',string)
}

//清除搜索结果
$(function(){
    $('.searchGet').bind('input porpertychange',function(){
        $('.clearSearch').show()
    }) 
    $('.clearSearch')
        .on('click', ()=>{
            $('.searchGet').val('')
            $('.clearSearch').hide(); 
        })
})

//键盘事件
$(document).on('keypress',(e)=>{
    //const e = e.key 简写为下方代码
    const {key} = e
    for(let i =0; i < hashMap.length; i++){
        window.open(hashMap[i].url,'_self')
    }
})