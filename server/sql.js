module.exports = {
    generateCondiction(typeStr,dateStr,areaStr,pageid){
        let sqlcondiction = "";
        if(typeStr != "all"){
            sqlcondiction +=`movieType = "${typeStr}" and `;
        }
        if(dateStr == "other"){
            sqlcondiction += `movieDate < 1990 and `;
        }else if(dateStr == "1900"){
            sqlcondiction += `movieDate between 1990 and 2000 and `;
        }else if(dateStr == "2000"){
            sqlcondiction += `movieDate between 2000 and 2010 and `;
        }else if(dateStr != "all"){
            sqlcondiction += `movieDate = ${dateStr} and `;
        }
        if(areaStr == "other"){
            sqlcondiction += `(movieArea = "其它" or movieArea = "未知" or movieArea = "西班牙") and `;
        }else if(areaStr == "欧美"){
            sqlcondiction += `(movieArea = "欧美" or movieArea = "美国" or movieArea = "英国") and `;
        }else if(areaStr != "all"){
            sqlcondiction +=  `movieArea = "${areaStr}" and `;
        }

        sqlcondiction = sqlcondiction.substring(0,sqlcondiction.length-4);
        if(sqlcondiction == ""){
            sqlcondiction += `limit ${pageid * 30},30`;
        }else{
            sqlcondiction = "where "+ sqlcondiction +` limit ${pageid * 30},30`;
        }
        return sqlcondiction;
    }
}