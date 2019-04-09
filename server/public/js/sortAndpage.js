if(!urlStr || pageid == 1){
    $(".page a").first().attr("href","./index.html?type=all&date=all&area=all&page=1");
    $(".page a").last().attr("href","./index.html?type=all&date=all&area=all&page=2");
}else{
    $(".page a").first().attr("href",`./index.html${urlSort}page=${pageid - 1}`);
    $(".page a").last().attr("href",`./index.html${urlSort}page=${1 + pageid}`);
}

if(urlStr){
    strarr = (urlStr.replace("?","")).split("&");
    let sortArr = strarr.map((x)=>(x.replace(/.*=/,"")));
    $(`.type button[value=${sortArr[0]}],.date button[value=${sortArr[1]}],.area button[value=${sortArr[2]}]`).css({
    "backgroundColor":"#ffcc66",
    "color": "#fff"
    });
}else{
    $("[value='all']").css({
        "backgroundColor":"#ffcc66",
        "color": "#fff"
    });
}

$("button[name]").click(function(){
    $(this).siblings().css({
        "backgroundColor":"transparent",
        "color": "#333"
    });
    $(this).css({
        "backgroundColor":"#ffcc66",
        "color": "#fff"
    })
    //通过背景颜色找到被选元素，这里再浏览器里面解析出来的是rgb值不是十六进制的
    let url = "?";
    $("button[style*='rgb(255, 204, 102)']").each(function(){
        url +=`${this.name}=${this.value}&`
    });
    window.location = "./index.html" + url + "page=1";
});