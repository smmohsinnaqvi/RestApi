var exp= require('express');
var mysql=require('mysql2');
var bp=require('body-parser');
var cors=require('cors');
var app=exp();
app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
app.use(cors());


var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mohsinnaqvi",
    database:"dac"

});

con.connect(function(err){
    if(!err)
    console.log("Database Connected");
    else
    console.log("Database Connection Failed");
})

app.get("/emps", function(req,res){

    con.query("select * from emp",function(err,result){
        if(!err)
        res.json(result);
    })

app.post('/insertEmp',function(req,res){
    var empid=req.body.empid;
    var ename=req.body.ename;
    var job=req.body.job;
    var deptno=req.body.deptno;

    var query="insert into emp(EMPNO,ENAME,JOB,DEPTNO) values(?,?,?,?)"

    con.query(query,[empid,ename,job,deptno],function(err){
        if(!err)
        res.send("INSERTION SUCCESSFULL");
        else
        res.send("INSERTION FAILED");
        
    });
})

app.post('/vlogin',function(req,res){
    var email=req.body.email;
    var pwd=req.body.pwd;

    var query=`select * from users where EMAIL=? and PWD=?`
    con.query(query,[email,pwd],function(err,result){
        if(!err)
        {
            res.send(result);
        }
        // if(!err)
        // {
        //     if(result.length>0)
        //     res.send("LOGGED IN");
        //     else
        //     res.send("WRONG EMAIL OR PASSWORD");
        // }
        // if(err)
        // {
        //     res.send("ERROR");
        // }
    })
})

});

app.listen(8080,function(req,res){
    console.log("Server Started at port 8080");
})