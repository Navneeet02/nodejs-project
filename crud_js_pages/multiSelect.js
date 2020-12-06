console.log("database file")
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port:3306,
    user     : 'root',
    password : 'root',
    database : 'projectdb'
  });

  var id=2;
  var sname='shubham';
  var scouse='ditss';
  var sfee=5000; 
  connection.connect(function(err){
      if(err){
          console.log("connection failed" + err)
      }else {
          
         let sql="select id,sname,scouse,sfee from studenttab where sfee>?";
          let fill=[id,sname,scouse,sfee];
          connection.query(sql,fill,function(err,data){
              if(err){
                  console.log("select failed " + err)
              }
              else{
           
                if(data.length===0){
                    console.log("no item found with this id " + id)
                }else{
                    
                    for(let i=0; i<data.length;i++){
                    console.log( data[i])
                    }
                }
            }
          }) 

         
      }
  })