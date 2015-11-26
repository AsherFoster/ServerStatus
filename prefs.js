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
    "slack":{
        "enabled":"true",
        "webhook":"https://hooks.slack.com/services/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"
    },
    "servers": [ // Servers to show
        // {
        // "name":"Name to display",
        // "url":"URL to check. Redirects will show as abnormal MUST HAVE PROTOCOL"
        // }
        {
            "name": "Developster Live",
            "url": "http://www.developster.io"
        },
        {
            "name": "Developster Alpha",
            "url": "http://alpha.developster.io"
        },
        {
            "name": "Developster Beta",
            "url": "http://beta.developster.io"
        },
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
        "background": "#0000FF", // Full page background
        "text":"#FFF" // Color of all text
    }
}