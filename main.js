
var result = `
/*
 * 注释
 *
*/
* {
    transition: all 1s;
}
html {
    font-size: 16px;
}
.code-wrapper {
    width: 50%;
    left: 0;
    position: fixed;
    height: 100%;
}
/* 加上点高亮 */
.token.comment {
    color: slategray;
}
.token.property {
    color: #f92672;
}
.token.selector {
    color: #a6e22e;
}
/* 加一个呼吸效果 */
#code{
  animation: breathe 1s infinite alternate-reverse;
}
#code {
    border:1px solid transparent;
    padding: 16px;
    overflow: hidden;
}
#code {
    left: 0;
    width: 100%;
    height:100%;
}
/*
* 准备一张白纸
*/
#paper {
    background-color: #272822;
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-item: center;
    padding: 24px;
    color: black;
}
#paper .content{
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
}
`
var result2 = `
#paper {
}
`
var result3 = `
/* 使用 marked.js 把 markdown 转化成 HTML*/
`
var result4 = `
/* 还差一点点*/
.markdown-body {
    padding: 16px;
    background-color: white;
    overflow: auto;
}
`
var md = `
# 简历
个人简历

#自我介绍
我叫 XXX
1994 年 5 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS

# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`
function writeMarkdown(markdown,fn){
    let domMarkdown = document.querySelector('#paper .content')
    let n = 0
    let timer = setInterval(()=>{
        n = n+1
        domMarkdown.innerHTML = markdown.substring(0,n)
        domMarkdown.scrollTop = domMarkdown.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(timer)
            fn.call()
        }
    },20)
}
function writeCode(prefix,code,fn){
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let timer = setInterval(()=>{
        n = n+1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css)
        domCode.scrollTop = domCode.scrollHeight
        styleTag.innerHTML = prefix + code.substring(0,n)
        if(n >= code.length){
            window.clearInterval(timer)
            fn.call()
        }
    },20)
}
writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md,()=>{
                writeCode(result + result2,result3,()=>{
                    convertMarkdownToHtml(()=>{
                        writeCode(result + result2 + result3,result4,()=>{
                            console.log('Done')
                        })
                    })
                })
            })
        })
    })
})
function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = "paper"
    var content = document.createElement('pre')
    content.className = "content"
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}
function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.style = 'background-color:white'
    markdownContainer.replaceWith(div)
    fn && fn.call()
}
function fn2(presult){
    var result2 = `
#paper {
    width: 100px;
    height: 100px;
    background: white;
}
    `
    var n = 0
    var timer = setInterval(()=>{
        n += 1
        code.innerHTML = presult + result.substring(0,n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
        styleTag.innerHTML = presult + result.substring(0,n)
        if(n >= result.length){
            window.clearInterval(timer)
        }
    },50)
}