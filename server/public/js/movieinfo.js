const urlStr = window.location.search;
$.ajax({
    url: `/movieinfo` + urlStr,
    type: 'GET',
    dataType:"json",
    success(data) {
        if(data.movie[0] == null ){
            window.location.href = "./404.html"
        }
        //将信息存储在浏览器的单个页面上
        sessionStorage.movieinfo = JSON.stringify(data.movie[0]);

        let score =  data.movie[0].movieScore;
        let rate = Math.round(score/2);
        $("title").append( "--"+ data.movie[0].movieName);
        $(".main").prepend(`<div class="info">
<div class="poster">
    <img src="${data.movie[0].moviePosterUrl}" alt="">
</div>
<div class="infomation">
    <h3>${data.movie[0].movieName}</h3>
    <p class="score"><span class="star">${"★★★★★☆☆☆☆☆".slice(5-rate,10-rate)}</span>${score.toFixed(1)}</p>
    <p class="type_date_area">
        <span class="type">类型：<a href="./index.html?type=lunli">${data.movie[0].movieType}</a></span>
        <span class="date">时间：<a href="./index.html?date=2019">${data.movie[0].movieDate}</a></span>
        <span class="area">地区：<a href="./index.html?area=hanguo">${data.movie[0].movieArea}</a></span>
    </p>
    <p class="actors">主演：<a href="#">${data.movie[0].movieActors}</a></p>
    <p class="director">导演：<a href="#">${data.movie[0].movieDirector}</a></p>
    <a href="./movieplay.html?id=${data.movie[0].id}"><button class="playbtn">立即播放</button></a>
</div>
</div>
<div class="synopsis">
<h4>电影简介</h4>
<p>${data.movie[0].movieSynopsis}</p>
</div>        `);
$(".like").append(`<h4>猜你喜欢</h4> <div class="container">
        </div>`);
        for(let likeitem of data.like){
            $(".container").append(`<div class="movie">
                <a href="./movieinfo.html?id=${likeitem.id}"><img class="moviePoster" src="${likeitem.moviePosterUrl}"></a>
                <a href="./movieinfo.html?id=${likeitem.id}" class="movieName">${likeitem.movieName}</a>
            </div>`);
        }
    },
    error(err) {
        console.log(err);
    }
});