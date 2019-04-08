const urlStr = window.location.search;
const pageid = parseInt(urlStr.replace(/[^0-9]/ig,"")) || 2;
$.ajax({
    url: '/index?page=1',
    type: 'GET',
    dataType:"json",
    success(data) {
        for(let value of data.movies){
            $(".container").append(`<div class="movie">
        <a href="./html/movieinfo.html?id=${value.id}"><img class="moviePoster" src="${value.moviePosterUrl}"></a>
        <a href="./html/movieinfo.html?id=${value.id}" class="movieName">${value.movieName}</a>
    </div>`);
        }
    },
    error(err){
        console.log(err);
        window.location.href = "./404.html";
    }
});

$(".pagebtn").click($.ajax({
    url: 'index' + urlStr,
    type: 'GET',
    dataType: "json",
    success(data){
        let moviesNum = data.movies.length;
        $(".container").html(""); 
        for(let value of data.movies){
            $(".container").append(`<div class="movie">
        <a href="./html/movieinfo.html?id=${value.id}"><img class="moviePoster" src="${value.moviePosterUrl}"></a>
        <a href="./html/movieinfo.html?id=${value.id}" class="movieName">${value.movieName}</a>
    </div>`);
        }
        if(moviesNum % 6 !== 0){
            for (let index = 0; index < 6-(moviesNum % 6); index++) {
                $(".container").append(`<div class="movie"></div>`); 
            }
        }
    },
    error(err){
        window.location.href = "./404.html";
    }
}));