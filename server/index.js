const express = require("express");
const app = express();
const mysql = require("./mysqlUilt");
const sqlgen = require("./sql");
app.use(express.static('public'));

app.get('/index', async (req,res)=>{
    let page =  req.query.page - 1 || 0;
    let type = req.query.type || "all";
    let date = req.query.date || "all";
    let area = req.query.area || "all";
    let condiction = sqlgen.generateCondiction(type,date,area,page)
    const resluts = await mysql.selectList("id,movieName,moviePosterUrl",condiction);
    res.json({movies: resluts});
});

app.get('/movieinfo', async (req,res)=>{
    //电影信息
    const reslut = await mysql.selectList("*",`where id = ${req.query.id}`);
    if(reslut[0] !=null){
        //同类电影
        const reslutLike = await mysql.selectList("id,movieName,moviePosterUrl",`where movieType = "${reslut[0].movieType}" limit ${parseInt(Math.random()*15 + 1)},6`);
        res.json({movie: reslut,like: reslutLike});
    }else{
        res.json({movie:reslut});
    }

});

app.listen(8081,function(){
    console.log("http://127.0.0.1:8081");
});