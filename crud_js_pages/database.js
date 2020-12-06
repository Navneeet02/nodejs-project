console.log("database file")
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port:3306,
    user     : 'root',
    password : 'root',
    database : 'projectdb'
  });

  var id=6;
  var sname='shubham';
  var scouse='ditss';
  var sfee=5000; 
  connection.connect(function(err){
      if(err){
          console.log("connection failed" + err)
      }else {
          let sql= "insert into studenttab (id,sname,scouse,sfee) values (?,?,?,?)"
        //  let sql="update studenttab set sname=?,scouse=?,sfee=? where id=?";
          let fill=[id,sname,scouse,sfee];
          connection.query(sql,fill,function(err,data){
              if(err){
                  console.log("insert failed " + err)
              }
              else{
                console.log("connection succeded")
                  let y = data.affectedRows;
                  
                  if(y===0){
                      console.log("update not happend nothing meet the var condition " + y)
              }else{
                console.log(" update succeded Rows affected are " + y);

              }
            }
          }) 

         
      }
  })

 //module.exports=database;