module.exports = {
    "temp":{
        "url": "http://stationdata.wunderground.com/cgi-bin/stationlookup?format=json&maxage=10&station=ICANTERB8&units=metric&v=2.0"
    },
    "slack":{
        "enabled": false, // Whether to send messages to slack
        "webhook": "http://example.com", // Slack webhook. See "Webhook integrations" in slack integrations for more info
        "threshold": 3 // How many attempts must fail before alerting Slack
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
        {
            "name": "Developster API",
            "url": "https://api.developster.io/admin/login"
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
            "name": "Kohknowco",
            "url": "http://www.kohknowco.org"
        },
        {
            "name": "UPT Digital",
            "url": "http://uptdigital.com"
        }
    ],
    "colors":{
        "online": "#0F0", // Online server circle color
        "abnormal": "#F70", // Abnormal color
        "offline": "#F00", // Offline color
//        "background": "#1177FF url(pic.jpg) no-repeat center;background-size:contain", // Full page background
        "background": "#000",
        "text": "#FFF" // Color of all text
    }
};