var http = require('http');
var express= require("express");
var app=express();
var nodemailer= require("nodemailer");
const bodyParser = require('body-parser');


var port = 8000


app.use(express.static('./abc'))
app.use(bodyParser.urlencoded({extended:true}));



//creating the server....
//  http.createServer(function (req, res) {
 
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     console.log(`hello server is up and running on ${port}`)
//     res.end(`hello  ${port}`);
   
//     //res.send(`server is up and running on ${port}`)
//   }).listen(port);
  
app.listen(8000,function(){
  console.log("server is running")
})


  app.get('/',function(req,res){
      console.log("hello")

      res.send("hello")
    
  })

  //get function calling 
  app.get('/ab',function(req,res){
    console.log("hello")
    let x = req.query.wc;
    res.send("the value of box is " + x);
  
})

//post  function calling 
  app.post("/area", function(req,res){
    let x= req.body.first;
    let y =req.body.second;

    let z=x*y
      res.send("Area is " + z);
  })

  app.post("/peri", function(req,res){
    let x= req.body.first;
    let y =req.body.second;
    let z= 2*(x+y);
      res.send("Area is " + z);
  })


  //code for sending the emails  

// var transporter= nodemailer.createTransport({
// service:'gmail',
// auth:{
//     user:'chekc8178@gmail.com',
//     pass:'Welcome@123',
// }
// });


// var mailOption={
// from:'chekc8178@gmail.com',
// to:'agra.anshul.548@gmail.com,navneetsinghd0@gmail.com',
// //to:'navneetsinghd0@gmail.com',
// Subject:'sending mail using nodejs',
// text:'Testing the node js code'

// };


//  transporter.sendMail(mailOption, function(error, info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Email sent : ' + info.response);
//     }
// })




