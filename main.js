/* main.js - Asher Foster 2015
 * 
 * Test API for server indicator
 */
var express = require("express"),
    prefs = require("./prefs"),
    http = require("http"),
    https = require("https"),
    url = require("url"),
    ping = require("ping"),
    app = express(),
    statuses = [];
function check(){
    prefs.servers.forEach(function(obj, ind, arr){
        var startTime = new Date();
        var get = http.get(obj.url, function (getRes) {
            statuses[ind] = {
                type: "http",
                code: getRes.statusCode,
                time: new Date() - startTime,
                text: http.STATUS_CODES[getRes.statusCode],
                success: true
            }
        }).on('error', function (err) {
            ping.sys.probe(obj.url, function(isAlive){
                if (isAlive)
                    statuses[ind] = {
                        type: "ping",
                        code: 0,
                        time: new Date() - startTime,
                        text: "Pinged Host",
                        success: true
                    };
                else
                    statuses[ind] = {
                        type: "none",
                        code: 0,
                        time: new Date() - startTime,
                        text: "Ping Failed",
                        success: false
                    };
            })
        }).on('socket', function (socket) {
            socket.setTimeout(3000);
            socket.on('timeout', function() {
                get.abort();
                statuses[ind] = {
                    type: "none",
                    code: 0,
                    time: new Date() - startTime,
                    text: "Timeout",
                    success: false
                };
            });
        });
    })
}
check();
setInterval(check, 5000);
app
    .use(function(req, res, next){
    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " - " +
        req.method + " " + req.url);
    next();
})

    .get('/', function(req, res, next){
        res.sendFile(__dirname + "/new.html");
    })
    .get('/prefs.js', function(req, res, next){
        res.set('Content-Type', 'application/javascript');
        res.send("var prefs = " + JSON.stringify({
            servers: prefs.servers,
            colors: prefs.colors,
            temp: prefs.temp
        }));
    })
    .get('/blocks.js', function(req, res, next){
        res.sendFile(__dirname + "/blocks.js");
    })
    .get('/text-fit.js', function(req, res, next){
        res.sendFile(__dirname + "/text-fit.js");
    })
    .get('/loading.svg', function(req, res, next){
        res.sendFile(__dirname + "/loading.svg");
    })
    .get('/check', function(req, res, next){
        res.json(statuses)
    })
    .get('/bus', function(req, res, next){
        http.get("http://rtt.metroinfo.org.nz/rtt/public/utility/file.aspx?ContentType=SQLXML&Name=JPRoutePositionET2&PlatformNo=10536", function(response){
            var data = "";
            response.on('data', function(chunk){
                data += chunk
            });
            response.on('end', function(){
                res.send(data);
            })
        });
    });

app.listen(process.argv[2] || process.env.PORT || 8080);