# ServerStatus

> ServerStatus was a web app I built when I was 15 and ran everything on a server hiding under a desk.
> 
> This is very very unsupported, and archived since, ya know, I haven't touched it since 2017.


## Information
A web app for showing the status of your servers. Built with Angular and Node.

## Installation
Clone this into a folder on your machine using
```
git clone https://github.com/AsherFoster/ServerStatus.git
```
Install the required dependencies
```
cd ServerStatus
npm install
```
And boot the server
```
npm start -- 8080
```
`8080` can be substituted with your port of choice, and defaults to 8080. Note that ServerStatus must be run with root to bind to port 80.
## Configuration
`config.json` currently only has one property. `servers` is an array of all the servers to check, with the following configuration for each:
```
{
    name: "Example Server",
    url: "http://example.com"
}
```
`name`: The graphical name to show on the web app

`url`: The URL to check
