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
    app = express();
function parseXml (xmlStr) {
    return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
}
app.use(function(req, res, next){
    //console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " - " +
    //    req.method + " " + req.url);
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
    .get('/check/:id', function(req, res, next){
        var host = prefs.servers[req.params.id],
            startTime = new Date();
        var get = http.get(host.url, function (getRes) {
            res.json({
                type: "http",
                code: getRes.statusCode,
                time: new Date() - startTime,
                text: http.STATUS_CODES[getRes.statusCode],
                success: true
            })
        }).on('error', function (err) {
            ping.sys.probe(host, function(isAlive){
                if (isAlive)
                    res.json({
                        type: "ping",
                        code: 0,
                        time: new Date() - startTime,
                        text: "Pinged Host",
                        success: true
                    });
                else
                    res.json({
                        type: "none",
                        code: 0,
                        time: new Date() - startTime,
                        text: "Ping Failed",
                        success: false
                    })
            })
        }).on('socket', function (socket) {
            socket.setTimeout(3000);
            socket.on('timeout', function() {
                get.abort();
                res.json({
                    type: "none",
                    code: 0,
                    time: new Date() - startTime,
                    text: error,
                    success: false
                });
            });
        });
    })
    .get('/bus', function(req, res, next){
        http.get("http://rtt.metroinfo.org.nz/rtt/public/utility/file.aspx?ContentType=SQLXML&Name=JPRoutePositionET2&PlatformNo=10536", function(response){
            var data = "";
            response.on('data', function(chunk){
                data += chunk
            })
            response.on('end', function(){
                res.send(data);
            })
        });
    })

app.listen(process.argv[2] || process.env.PORT || 8080);