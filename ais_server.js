var http = require('http'); 
var fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈 
// 404 error message : 페이지 오류가 발생했을때, 
function send404Message(response){ 
	response.writeHead(404,{"Content-Type":"text/plain"}); 
	// 단순한 글자 출력 
	response.write("404 ERROR... "); 
	response.end(); 
} 
// 200 Okay : 정상적인 요청 
function onRequest(request, response){ 
	if(request.method === 'GET' && request.url === '/'){ 
		response.writeHead(200,{"Content-Type":"text/html"}); // 웹페이지 출력 
		fs.createReadStream("./html/index.html").pipe(response); // 같은 디렉토리에 있는 index.html를 response 함 
		return;
	} else if(request.url.lastIndexOf(".jpg") > -1 || request.url.lastIndexOf(".jpeg") > -1) {
		response.writeHead(200,{"Content-Type":"image/jpeg"}); // 웹페이지 출력 
	} else if(request.url.lastIndexOf(".png") > -1) {
		response.writeHead(200,{"Content-Type":"image/png"}); // 웹페이지 출력 
	} else if(request.url.lastIndexOf(".css") > -1) {
		response.writeHead(200,{"Content-Type":"text/css"}); // 웹페이지 출력 
	} else if(request.url.lastIndexOf(".js") > -1) {
		response.writeHead(200,{"Content-Type":"text/javascript"}); // 웹페이지 출력 
	} else { // file이 존재 하지않을때, 
		response.writeHead(200,{"Content-Type":"text/html"}); // 웹페이지 출력 
	}
	try {
		fs.createReadStream("./html"+request.url).pipe(response);
	} catch(e) {
		send404Message(response); 
	}
}
var server =http.createServer(onRequest);
server.listen(8888); 
console.log('Start AIS Server...');
