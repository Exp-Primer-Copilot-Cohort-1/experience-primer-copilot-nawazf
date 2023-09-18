// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server object
var server = http.createServer(function(request,response){
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource='+resource);
    // if client request is '/hello'
    if(resource == '/hello'){
        // 3. response to client
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end('Hello World');
    }else if(resource == '/welcome'){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end('Welcome');
    }else if(resource == '/echo'){
        var method = request.method;
        console.log('method='+method);
        if(method == 'GET'){
            var parsedUrl = url.parse(request.url,true);
            console.log(parsedUrl);
            var query = parsedUrl.query;
            console.log(query);
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end('GET method, query string:'+JSON.stringify(query));
        }else if(method == 'POST'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                var post = qs.parse(body);
                console.log(post);
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end('POST method, body:'+JSON.stringify(post));
            });
        }
    }else if(resource == '/comment'){
        var method = request.method;
        console.log('method='+method);
        if(method == 'GET'){
            var parsedUrl = url.parse(request.url,true);
            console.log(parsedUrl);
            var query = parsedUrl.query;
            console.log(query);
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end('GET method, query string:'+JSON.stringify(query));
        }else if(method == 'POST'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                var post = qs.parse(body);
                console.log(post);
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end('POST method, body:'+JSON.stringify(post));
            });
        }
    }else{
        response.writeHead(404,{'Content-Type':'text/html'});
        response.end('404 Not Found');
    }
});
// 4. start web server
server.listen(8080,function(){
    console.log('Server running at http://',
    localhost:8080');
}