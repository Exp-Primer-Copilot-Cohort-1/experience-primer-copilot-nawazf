// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request,response){
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource='+resource);

    // if request method is GET
    if(request.method == 'GET'){
        if(resource == '/'){
            fs.readFile('index.html', 'utf-8', function(error, data){
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(data);
            });
        }else if(resource == '/favicon.ico'){
            fs.readFile('favicon.ico', function(error, data){
                response.end(data);
            });
        }else if(resource == '/comments'){
            fs.readFile('comments.json', 'utf-8', function(error, data){
                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(data);
            });
        }else{
            fs.readFile('index.html', 'utf-8', function(error, data){
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(data);
            });
        }
    // if request method is POST
    }else if(request.method == 'POST'){
        if(resource == '/comments'){
            // read message
            request.on('data', function(data){
                var message = JSON.parse(data);
                console.log(message);
                // write message to comments.json
                fs.readFile('comments.json', 'utf-8', function(error, data){
                    var comments = JSON.parse(data);
                    comments.push(message);
                    fs.writeFile('comments.json', JSON.stringify(comments), function(error){
                        response.writeHead(200, {'Content-Type':'application/json'});
                        response.end(JSON.stringify(comments));
                    });
                });
            });
        }
    }
});
// 3. start web server
server.listen(3000, function(){
    console.log('Server running at http://localhost:3000');
});
