import http from 'http';
import portfinder from 'portfinder';
import {app, appyMiddlewares} from "./app"
import graphqlServer from "./graphql";
import {Controller} from "../utils/generic/controller";
import express, {Express} from "express";
declare var global: any;

export default async () => {

    await graphqlServer(app);
    //Catch request in case of not found url
    appyMiddlewares(app)
    const availablePort : number = await portfinder.getPortPromise({
        port : <number> parseInt(process.env.APP_PORT ?? "3000"),
        startPort : 3000,
        stopPort : 5999
    });

    app.set('port', availablePort);

    global.appPort = availablePort;

    const server = http.createServer(app);

    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + availablePort;
        console.log('Listening on ' + bind);
    });

    server.listen(availablePort, ()=>{});
}
