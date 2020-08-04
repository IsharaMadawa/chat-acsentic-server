'use strict';
 
const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const socketEvents = require('./web/socket'); 
const routes = require('./web/routes'); 
const appConfig = require('./config/app-config'); 
 
class Server{
 
    constructor(){
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }
 
    appConfig(){        
        new appConfig(this.app).includeConfig();
    }

    includeRoutes(){
        new routes(this.app).routesConfig();
        new socketEvents(this.socket).socketConfig();
    } 
 
    appExecute(){
        this.appConfig();
        this.includeRoutes();
 
        const port =  process.env.PORT || 4000;
        const host = process.env.HOST || `localhost`;      

        this.http.listen(port, () => {
            console.log('Node app is working!');
        });
    }
 
}
    
const app = new Server();
app.appExecute();