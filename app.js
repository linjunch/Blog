const express=require('express');
const ejs=require('ejs');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app=express();

const ObjectID = require("mongodb").ObjectId;

const db=require('./model/db.js');

// session
var session = require('express-session');
// 持久化
var NedbStore = require('nedb-session-store')( session );
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:20000000
    },
    // 配置持久化
    store: new NedbStore({
        filename: 'path_to_nedb_persistence_file.db'
    })
}));

app.set('view engine','ejs');
app.use('/public',express.static('./public'));

const md5 = require("md5");

app.get(`/`,(req,res)=>{
    res.render('register');
});
app.get(`/register`,(req,res)=>{
    res.render('register')
});
app.get(`/login`,(req,res)=>{
    res.render('login');
});
app.get("/create",(req,res)=>{
    if(req.session.login){
        var n = req.query.n>1?req.query.n:1;
        db.find("blog","tweet",{},res,function (a) {
            var s = a.length>n*5?true:false;
            var starIndex = a.length-n*5>0?a.length-n*5:0;

            for(var j =0;j<a.length;j++){
                if(a[j].praise.indexOf(req.session.user)!==-1){
                    a[j].color="org";
                }
            }
            // console.log(a);
            res.render('create',{
                    user:req.session.user,
                    tweet:a.splice(starIndex,n*5),
                    more:s
            })
        });
    }else{
        res.render('login');
    }

});
app.get("/list",(req,res)=>{
    res.render('list');
});
app.post("/saveInfo",urlencodedParser,(req,res)=>{
    var obj = {
        user:req.body.user,
        psw:md5(md5(req.body.psw)),
        per:req.body.per
    };
    db.find("blog","info",{user:req.body.user},res,function (res1) {
        if(res1.length===0){
            db.insert("blog","info",obj,res,function () {
                res.send({ok:1});
            });
        }else{
            res.send({ok:0});
        }
    });

});

app.post("/check",urlencodedParser,(req,res)=>{
    db.find("blog","info",{user:req.body.user,psw:md5(md5(req.body.psw))},res,function (res1) {
        if(res1.length===0){
            res.send({check:0});
        }else{
            req.session.user = req.body.user;
            req.session.login=true;
            res.send({check:1});
        }
    });
});
app.get('/quit',(req,res)=>{
    req.session.login=false;
    res.redirect('http://localhost:8989/create')
});



app.post("/tweet",urlencodedParser,(req,res)=>{
    var obj = {
        user:req.body.user,
        title:req.body.title,
        blog:req.body.blog,
        time:req.body.time,
        praise:[],
        comment:[]
    };
    db.insert("blog","tweet",obj,res,function (a) {
        res.send({id:a.ops[0]._id});
    });
});





app.post("/more",urlencodedParser,(req,res)=>{
    var n = req.body.n;
    db.find("blog","tweet",{},res,function (a) {
        var starIndex = a.length-n*5>0?a.length-n*5:0;
        var num = a.length>n*5?5:a.length-n*5+5;
        var s = a.length>n*5?true:false;

        for(var j =0;j<a.length;j++){
            if(a[j].praise.indexOf(req.session.user) !== -1){
                a[j].color="org";
            }
        }

        res.send({
            tweet:a.splice(starIndex,num),
            more:s
        })
    })
});


app.post("/up",urlencodedParser,(req,res)=>{
    if(req.body.hasPraise==1){
        db.update("blog","tweet",{_id:ObjectID(req.body.id)},{$pull:{praise:req.body.user}},res);
        res.send({ok:0});
    }else{
        db.update("blog","tweet",{_id:ObjectID(req.body.id)},{$addToSet:{praise:req.body.user}},res);
        res.send({ok:1});
    }

});

app.post("/cmt",urlencodedParser,(req,res)=>{
    var time= req.body.time;
    var cmter = req.body.user;
    var cmt = req.body.cmt;
    db.update("blog","tweet",{_id:ObjectID(req.body.id)},{$addToSet:{comment:{
                cmter:cmter,
                cmt:cmt,
                time:time
    }}},res);
    res.send({ok:1})
});


app.listen(8989,"localhost",()=>{
    console.log("server is running!")
});