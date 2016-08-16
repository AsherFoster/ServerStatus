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

    servers = prefs.servers
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
    });


io.on('connection', function(socket){
    console.log(Date(), "New Connection");
    socket.emit('init', {
        servers: servers
    });
});
update();
setInterval(update, 10000);
server.listen(7001, function(){
    console.log("Ready on port 7001");
});