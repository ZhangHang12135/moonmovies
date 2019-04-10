//获取页面缓存
const movie = JSON.parse(sessionStorage.movieinfo);
let url = movie.movieUrl;
console.log(url);
if(url.endsWith("html") || url.endsWith("m3u8")){
    url = "https://jx.wslmf.com/?url="+url;
}
$("title").text(`电影播放--${movie.movieName}`);
$(".main").append(`        <div class="play">
<iframe src="${url}" frameborder="0"></iframe>
</div>
<div class="info">
<h3>${movie.movieName}</h3>
<p class="type_date_area">
   <span class="type">类型：<a href="../index.html?type=${movie.movieType}&date=all&area=all&page=1">${movie.movieType}</a></span>
   <span class="date">时间：<a href="../index.html?type=all&date=${movie.movieDate}&area=all&page=1">${movie.movieDate}</a></span>
   <span class="area">地区：<a href="../index.html?type=all&date=all&area=${movie.movieArea}&page=1">${movie.movieArea}</a></span>
</p>
</div>`);