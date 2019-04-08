"use strict";
/**
 * 连接mysql的工具模块
 */
//导入mysql模块
const mysql = require("mysql");
//连接数据库所需的参数
const HOST = "localhost",
      USER = "root",
      PASSWORD = "password",
      PORT = "3306",
      DATABASE = "moonmovies";
//创建数据池
let pool = mysql.createPool({
    host     : HOST,
    user     : USER,
    password : PASSWORD,
    port     : PORT,
    database : DATABASE
});

let selectList = function(tableValues,condition){
    if(!condition){
        condition = "";
    }
    let sql = "select "+tableValues+ " from movies "+condition;
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,(err,results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                    //结束会话
                    connection.release();
                })
            }
        })
    })
}
// //在数据池中进行会画操作
// pool.getConnection(function(err,connection){
//     connection.query("select * from movies where id < 40",(err,results,fields)=>{
//         if(err) throw err;
//         //结束会话
//         connection.release();
//     })
// })
module.exports = {
    selectList
}
// console.log(selectList("id,movieName","where id = 47"));