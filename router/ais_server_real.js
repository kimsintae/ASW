var express = require('express')
, http = require('http')
, static = require('serve-static')
, path = require('path');

// 웹서버 
var app = express();


app.use('/',static(path.join(__dirname,'public')));


//미들웨어 #0
app.use('/app',function(req, res, next){
    console.log('미들웨어 #0 호출.');
    res.writeHead('200',{'Context-Type':'text/html;charset=utf8'});
    res.end('<h1>This app2 is from node.js</h1>');
});


app.use('/app2',function(req, res, next){
    console.log('미들웨어 #1 에서 요청을 처리합니다. ');
    res.writeHead('200',{'Context-Type':'text/html;charset=utf8'});
    res.end('<h1>This app is from node.js</h1>');
})


http.createServer(app).listen(8080,function(){
	console.log('starting server : port 8080');
})

