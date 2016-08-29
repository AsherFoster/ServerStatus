/**
 * Created by asher on 16/08/16.
 */
var express = require('express'),
    http = require('http'),
    https = require('https'),

    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),

    prefs = require('./config.json'),

    servers = prefs.servers,
    port = process.argv[2] || 8080
;
function update(){
    servers.forEach(function(server){
        (server.url.split('://')[0] === 'https' ? https: http).get(server.url, function(res){
            server.lastChecked = Date.now();
            if(res.statusCode !== server.status){
                server.status = res.statusCode;
                io.emit('update', server);
            }
            res.destroy();
        }).on('error', function(err){
            server.lastChecked = Date.now();
            server.status = 'err';
            io.emit('update', server);
        })
    });
}

servers.forEach(function(server, ind){
    server.id = ind;
});

app
    .get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    })
    .get('/blocks.js', function(req, res){
        res.sendFile(__dirname + '/blocks.js');
    });


io.on('connection', function(socket){
    console.log(new Date(), socket.conn.remoteAddress, "New Connection");
    socket.emit('init', {
        servers: servers
    });
});
update();
setInterval(update, 10000);
server.listen(port, function(){
    console.log("Ready on port " + port);
});
process.on('SIGINT', function(){
    console.log("Shutting down");
    server.close();
    setTimeout(function(){
        console.log("Shutdown Timeout. Forcefully killing");
        process.exit(1);
    }, 5000);
});