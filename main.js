/* main.js - Asher Foster 2015
 * 
 * Test API for server indicator
 */

var http = require("http"),
    url = require("url"),
    server = http.createServer(function(req, res){
        var reqUrl = url.parse(req.url).query.split('=')[1];
        console.log(reqUrl)
        
    });
server.listen(process.argv[2] || process.env.PORT || 8085);