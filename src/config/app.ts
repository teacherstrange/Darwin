import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as path from 'path';
import helmet from 'helmet';
import {ValidateError} from 'tsoa';
import * as dotenv from 'dotenv';

import graphqlServer from './graphql';

import {Controller} from '../utils/generic/controller';

//Middleware Error
import {ErrorMiddleware} from '../utils/generic/error.middleware';

//Inclusions of all Routes
import {allRoutes} from '../../routes';
declare var global: any;

//Response builder
import Builder from '../utils/generic/response.builder';


global.responseCode = Builder.getCode();

dotenv.config();

export const app: Express = express();

export const appyMiddlewares = (app : Express) => {

//Debugger --dev
    app.use(morgan('dev'));

//Security Filter
    app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
    app.use(cors());


// server static files
    app.use('/static', express.static(path.resolve('static')));

// parse body params and attache them to req.body
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded({ extended: true }));

//Routes inclusion
    const routing = express();
    allRoutes(routing);

    app.use(process.env.ROUTE_PREFIX || '/api', routing)

    app.use((req, res) => {
        let ctrl = new Controller();
        res.send(ctrl.liteResponse(global.responseCode.NOT_FOUND, {
            AppName: process.env.APP_NAME,
            AppUrl: process.env.APP_DOMAIN + ':' + global.appPort,
            path: req.originalUrl,
        }))
    })

    function error(err:any, req:Request, res:Response, next: any) {
        // respond with 500 "Internal Server Error".
        if (res.headersSent) {
            return next(err);
        }

        const locals = {
            name: err.name,
            message: err.message,
            details: err.details,
        };
        // res.locals.stack = req.app.get('env') === 'development' ? err.stack : undefined;

        if ('fields' in err) {
            const details: Record<string, any> = {};

            for (const key in err.fields) {
                // lets remove the body. when validating body
                if (key.startsWith('body.')) {
                    details[key.substr(5)] = err.fields[key];
                } else {
                    details[key] = err.fields[key];
                }
            }

            if (process.env.NODE_ENV === 'production') {
                delete err.fields;
            }
            console.log(details);
            locals.details = details;
        }


        // render the error page
        // res.status(err.status || 500);

        let ctrl = new Controller();
        if (err instanceof ValidateError){
            res.send(ctrl.liteResponse(global.responseCode.VALIDATION_ERROR, locals));
        }
        if (err instanceof ErrorMiddleware){
            res.send(ctrl.liteResponse(global.responseCode.NOT_AUTHORIZED, err));
        }
        else{
            console.log(err instanceof ErrorMiddleware, err instanceof Error);
            res.send(ctrl.liteResponse(global.responseCode.FAILURE, null, err.message));
        }
    }

// the error handler is placed after routes
// if it were above it would not receive errors
// from app.get() etc
    app.use(error);


}
