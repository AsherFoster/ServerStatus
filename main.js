/* main.js - Asher Foster 2015
 * 
 * Test API for server indicator
 */

var express = require("express"),
    http = require("http"),
    https = require("https"),
    url = require("url"),
    ping = require("net-ping"),
    app = express();
app.use(function(req, res, next){
    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " - " +
        req.method + " " + req.url);
    next();
});
app
    .get('/', function(req, res, next){
        res.sendFile(__dirname + "/new.html");
    })
    .get('/prefs.js', function(req, res, next){
        res.sendFile(__dirname + "/prefs.js");
    })
    .get('/blocks.js', function(req, res, next){
        res.sendFile(__dirname + "/blocks.js");
    })
    .get('/text-fit.js', function(req, res, next){
        res.sendFile(__dirname + "/text-fit.js");
    })
    .get('/check', function(req, res, next){
        var host = url.parse(req.query.url),
            proc = url.protocol == 'https:' ? https : http,
            resp = {},
            startTime = new Date();
        proc.get(host.href, function(getRes){
            res.json({
                type: "http",
                code: getRes.statusCode,
                time: new Date() - startTime,
                text: http.STATUS_CODES[getRes.statusCode],
                success: true
            });
        }).on('error', function(err){
            ping.createSession().pingHost (host.hostname, function (error, target) {
                if (error)
                    res.json({
                        type: "ping",
                        code: 0,
                        time: new Date() - startTime,
                        text: error,
                        success: false
                    });
                else
                    res.json({
                        type: "ping",
                        code: 0,
                        time: new Date() - startTime,
                        text: "Ping Error",
                        success: true
                    })
            });
        });
    });

app.listen(process.argv[2] || process.env.PORT || 8080);