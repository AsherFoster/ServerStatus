var prefs = {
    "showTime": true, // Toggle Time widget
    "showDate": true, // Toggle Date widget
    "showDay": true, // Toggle Day widget
    "showBlock": true, // Toggle Block widget
    "showNextBlock": true, // Toggle Next Block widget
    "showcountBlock": true, // Toggle Count Down until next Block widget
    "showTemp": true, // Toggle Temperature widget
    "showKey": true, // Toggle Key widget
    "timeout":5000, // How long to wait for testPage to return status code
    "testPage":"/test.php?url=", // Page to test if server is up. Page must return status code in plain text
    "checkRate":2000, // How often (in milliseconds) should the servers be checked
    "temp":{
        "url":"http://stationdata.wunderground.com/cgi-bin/stationlookup?format=json&maxage=10&station=ICANTERB8&units=metric&v=2.0",
    },
    "threshold":2, // How many attempts must fail before updating status
    "slack":{
        "enabled":false, // Whether to send messages to slack
        "webhook":"http://example.com", // Slack webhook. See "Webhook intergrations" in slack intergrations for more info
        "threshold":3 // How many attempts must fail before alerting Slack
    },
    "servers": [ // List of servers to check
        // {
        // "name":"Example Server", Server name
        // "url":"http://example.com" URL to check. Redirects will show as abnormal NOTE: If using slack, protocols are a requirement
        // },
        {
            "name": "Developster Live",
            "url": "http://www.developster.io"
        },
        {
            "name": "Developster Beta",
            "url": "http://beta.developster.io"
        },
//        {
//            "name": "Developster Alpha",
//            "url": "http://alpha.developster.io",
//            "alert":false
//        },
        {
            "name": "Innovate For ChCh",
            "url": "http://innovateforchch.nz"
        },
        {
            "name": "Muute",
            "url": "http://muute.net"
        },
        {
            "name": "Kohknowco",
            "url": "http://www.kohknowco.org"
        },
        {
            "name": "UPT Digital",
            "url": "http://uptdigital.com"
        }
    ],
    "colors":{
        "online":"#0F0", // Online server circle color
        "abnormal":"#F70", // Abnomal color
        "offline":"#F00", // Offline color
        "background": "#000 no-repeat;background-size:cover", // Full page background
        "text":"#FFF" // Color of all text
    }
}