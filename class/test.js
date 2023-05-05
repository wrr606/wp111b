let x=await fetch("https://www.google.com.tw/?hl=zh_TW")
let y=await x.text()
console.log(y)