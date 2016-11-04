/**
 * Created by asher on 16/08/16.
 */
var express = require('express'),
    http = require('http'),
    https = require('https'),
    ping = require('ping'),
    tcping = require('tcp-ping'),

    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),

    prefs = require('./config.json'),

    temp = 0,

    servers = prefs.servers,
    port = process.argv[2] || 8080
;
function checkServer(server){
    var protocol = server.url.split('://');
    if(protocol[0] === 'tcping'){
        var url = protocol[1].split(":");
        tcping.probe(url[0], url[1], function(err, ok){
            if(err) ok = false;

            if(!ok && !server.retry){
                server.retry = true;
                setTimeout(function(){
                    checkServer(server);
                }, 500);
            }else if(!ok){
                server.retry = false;
                server.status = 'err';
                io.emit('update', server);
            }else if(ok && server.status !== "OK!"){
                server.retry = false;
                server.status = 'OK!';
                io.emit('update', server);
            }
        });
    }else if(protocol[0] === 'ping'){
        ping.sys.probe(protocol[1], function(ok){
            if(!ok && !server.retry){
                server.retry = true;
                setTimeout(function(){
                    checkServer(server);
                }, 500);
            }else if(!ok){
                server.retry = false;
                server.status = 'err';
                io.emit('update', server);
            }else if(ok && server.status !== "OK!"){
                server.retry = false;
                server.status = 'OK!';
                io.emit('update', server);
            }
        });
    }else{
        (protocol[0] === 'https' ? https: http).get(server.url, function(res){
            res.destroy();
            if(res.statusCode !== 200 && !server.retry){
                server.retry = true;
                setTimeout(function(){
                    checkServer(server);
                }, 500);
            }else if(res.statusCode !== 200 && server.retry && res.statusCode !== server.status){
                server.retry = false;
                server.status = res.statusCode;
                io.emit('update', server);
            }else if(res.statusCode !== server.status){
                server.retry = false;
                server.lastChecked = Date.now();
                if(res.statusCode !== server.status){
                    server.status = res.statusCode;
                    io.emit('update', server);
                }
            }
        }).on('error', function(err){
            if(server.retry){
                server.lastChecked = Date.now();
                server.status = 'err';
                io.emit('update', server);
            }else{
                server.retry = true;
                setTimeout(function() {
                    checkServer(server)
                }, 500);
            }
        })
    }
}
function checkTemp(){
    http.get(prefs.temp, function(res){
        var body = "";
        res.on('data', data => body += data);
        res.on('end', function(){
            body = JSON.parse(body);
            var station = body.stations.ICANTERB8;
            if(!station) return;
            var latestTemp = station.temperature;
            if(latestTemp !== temp){
                temp = latestTemp;
                io.emit('temp', {temp: temp});
            }
        })
    }).on('error', err => console.error(err));
}
function update(){
    try{
        checkTemp();
        servers.forEach(checkServer);
    }catch(e){
        console.error(e);
    }
}

servers.forEach(function(server, ind){
    server.id = ind;
});

app
    .get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    })
    .get('/control', function(req, res){
        res.sendFile(__dirname + '/control.html');
    })
    .get('/blocks.js', function(req, res){
        res.sendFile(__dirname + '/blocks.js');
    });


io.on('connection', function(socket){
    console.log(new Date(), socket.conn.remoteAddress, "New Connection");
    socket.emit('init', {
        servers: servers,
        temp: temp
    });
    socket.on('mode_update', function(payload){
        io.emit('mode_update', payload);
    })
});
update();
setInterval(update, 10000);
server.listen(port, function(){
    console.log("Ready on port " + port);
});
process.on('SIGINT', function(){
    console.log("Shutting down");
    setTimeout(function(){
        console.log("Shutdown Timeout. Forcefully killing");
        process.exit(1);
    }, 5000);
    server.close(function(){
        process.exit(0);
    });

});
