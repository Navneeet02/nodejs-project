console.log("database file")
var express = require('express');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port:3306,
    user     : 'root',
    password : 'root',
    database : 'projectdb'
  });

  var id=3;
  var sname='agrawal';
  var scouse='ditss';
  var sfee=3000; 
  connection.connect(function(err){
      if(err){
          console.log("connection failed" + err)
      }else {
         let sql="update studenttab set sname=?,scouse=?,sfee=? where id=?";
         //Most important the squence of parameter in query and array otherwise you will face 
         //a lot of entertainment and going to hell and broke your pc.
          let fill=[sname,scouse,sfee,id];
          connection.query(sql,fill,function(err,data){
              if(err){
                  console.log("insert failed " + err)
              }
              else{
                console.log("connection succeded")
                  let y = data.affectedRows;
                  
                  if(y==0){
                      console.log("update not happend nothing meet the var condition " + y)
              }else{
                console.log(" update succeded Rows affected are " + y);

              }
            }
          }) 

         
      }
  })