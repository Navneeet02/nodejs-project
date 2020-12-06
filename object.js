console.log("hello world");
var express = require('express')
const app = express();

//it is something like middleware.
const bodyParser = require('body-parser'); //get the object

app.use(bodyParser.urlencoded({ extended: true })); //call the function of the object
app.use(express.json());
//database connection
var mysql = require('mysql');
const { json } = require('express');
const { table } = require('console');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'projectdb'
});




app.use(express.static('./abc'))

app.post('/findonestudent', function (req, res) {
    //  res.send("ok fine")
    let id = req.body.ino;
    console.log("no is " + id);
    let y = { id: 0, sname: '', scouse: '', sfee: 0 }; //mock value of dummy vlaue

    connection.connect(function (err) {
        if (err) {
            console.log("connection failed" + err)
        } else {

            let sql = "select sname, scouse,sfee from studenttab where id=?";
            let fill = [id];
            connection.query(sql, fill, function (err, data) {
                if (err) {
                    console.log("select failed " + err)
                }
                else {

                    if (data.length === 0) {
                        res.send(y); //this line converting json string
                    } else {
                        console.log(data[0])
                        res.send(data[0]);
                    }
                }
            })


        }
    })
})

//adding student in the database

app.post('/addstudent', function (req, res) {

    let id = req.body.sid;
    let sname = req.body.sname;
    let scouse = req.body.scouse;
    let sfee = req.body.sfee;

    let msg = req.body.sid + "  " + req.body.sname + "  " + req.body.scouse + " " + req.body.sfee;
    console.log("input data" + msg);
    let sdata = { staus: 0, 
        content:[],
        reason: "failed beacuse of Primary key" };

     // JSON.parse(sdata);
    connection.connect(function (err) {
        if (err) {
            console.log("connection failed" + err)
        } else {
            let sql = "insert into studenttab (id,sname,scouse,sfee) values (?,?,?,?)"
            //  let sql="update studenttab set sname=?,scouse=?,sfee=? where id=?";
            let fill = [id, sname, scouse, sfee];
            connection.query(sql, fill, function (err, data) {
               // console.log(data);
                if (data.length===0) {
                    console.log("insert failed " + err)
                    res.send(sdata)
                   // res.send(JSON.parse(sdata));
                }
                else {
                    console.log("connection succeded")
                    sdata.staus = 1;
                    sdata.reason = 'Success';
                  //  sdata.content=data;
                    console.log(data);
                    res.send(data);
                //   res.send(JSON.parse(sdata));


                    //     let y = data.affectedRows;

                    //     if(y===0){
                    //         console.log("insert failed " + y)
                    // }else{
                    //   console.log(" update succeded Rows affected are " + y);


                    // }
                }
            })


        }
    })
})

//update student

app.post('/updatestudent', function (req, res) {
    let id = req.body.sid;
    let sname = req.body.sname;
    let scouse = req.body.scouse;
    let sfee = req.body.sfee;

    let msg = req.body.sid + "  " + req.body.sname + "  " + req.body.scouse + " " + req.body.sfee;
    console.log("input data" + msg);
    let sdata = { staus: 400, message: "db faliure" };

    connection.connect(function (err) {
        if (err) {
            console.log("connection failed" + err)
            res.send(sdata);
        } else {
            let sql = "update studenttab set sname=?,scouse=?,sfee=? where id=?";
            //Most important the squence of parameter in query and array otherwise you will face 
            //a lot of entertainment and going to hell and broke your pc.
            let fill = [sname, scouse, sfee, id];
            connection.query(sql, fill, function (err, data) {
                if (err) {
                    console.log("insert failed " + err)

                }
                else {
                    console.log("connection succeded")
                    let y = data.affectedRows;

                    if (y == 0) {
                        console.log("update not happend nothing meet the var condition " + y)
                        sdata.staus = -1;
                        sdata.message = 'where condition failed'
                    } else {
                        console.log(" update succeded Rows affected are " + y);
                        sdata.staus = 1;
                        sdata.message = 'Successfully updated'

                    }
                    res.send(sdata);
                }
            })


        }
    })

})

//finding all the students
app.get('/allstudents', function (req, res) {

    let sfee = req.query.sfee;
    let sdata = { status: 200, content: [] };
    connection.connect(function (err) {
        if (err) {
            console.log("connection failed" + err)
        } else {

            let sql = "select id,sname,scouse,sfee from studenttab where sfee>?";
            let fill = [sfee];

            connection.query(sql, fill, function (err, data) {
            
                if (err) {
                    console.log("select failed " + err)
                }
                else {

                    if (data.length === 0) {
                        console.log("no item found with this id " + id)
                        sdata.status = 0;

                        
                        res.send(sdata)
                        
                    } else {

                        sdata.status = 1;
                        sdata.content = data;
                        console.log(sdata);
                        res.send(sdata)

                    }
                }
            })
        }
    })

})

//finding all the students based on name
app.get('/findstudentbasedonname', function (req, res) {

    let sname = req.query.sname;
    let sdata = { status: 200, content: [] };
    connection.connect(function (err) {
        if (err) {
            console.log("connection failed" + err)
        } else {

            let sql = "select id,sname,scouse,sfee from studenttab where sname=?";
            let fill = [sname];

            connection.query(sql, fill, function (err, data) {
                if (err) {
                    console.log("select failed " + err)
                }
                else {

                    if (data.length === 0) {
                        console.log("no item found with this id ")
                        sdata.status = 0;

                        
                        res.send(sdata)
                        
                    } else {

                        sdata.status = 1;
                        sdata.content = data;
                        console.log(sdata);
                        res.send(sdata)

                    }
                }
            })
        }
    })

})

//deleteing the student.
app.delete('/deletestudent' ,function(req,res){
    let id = req.body.sid;
    let sdata= {status:200, msg:"db faliure"}

connection.connect(function(err){
    if(err){
        console.log("connection failed" + err)
        res.send(sdata)
    }
    else {
       let sql="delete from studenttab  where id=?";
       //Most important the squence of parameter in query and array otherwise you will face 
       //a lot of entertainment and going to hell and broke your pc.
        let fill=[id];

            connection.query(sql,fill,function(err,data){
            if(err){
                console.log("Delete failed " + err)
                
            }
            else{
              console.log("connection succeded")
                let y = data.affectedRows;
                
                if(y==0){
                    sdata.status=0;
                    sdata.msg="Delete not happend nothing meet the var condition";
                    //res.send(sdata)
                   // console.log("Delete not happend nothing meet the var condition" + y)
            }
            else{
             sdata.status=1;
             sdata.msg="delete successfull"
              console.log(" Delete succeded Rows affected are " + y);
              //res.send(sdata)
            }
            res.send(sdata)
          }
        }) 

       
    }
})
})
//fetching the multiple the row



//setting server port number
app.listen(600, function () {
    console.log('server is running !!!!')
})