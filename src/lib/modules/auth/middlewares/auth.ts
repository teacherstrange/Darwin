import jwt, {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import { Request , Response } from 'express';

import {User} from '../auth.model';
import config from "../../../../config/config";
import {FooError} from "../../../../utils/generic/error.middleware";
import {Controller} from "../../../../utils/generic/controller";
const Ctrl = new Controller;

declare var global: any;


/**
 * @params params Type description
 */

export const expressAuthentication = async (req: Request, securityName: string, scopes?: string[]) : Promise<any> => {

    try {
        if (securityName === "Bearer"){
            let token : any = req.body.authorization || req.query.authorization || req.headers["authorization"];
            token = token.split("Bearer ")[1]
            if (!token)
                throw new FooError("Token not found");
            const decoded: any = jwt.verify(token, config.JWT_SECRET);
            if (decoded instanceof (JsonWebTokenError || TokenExpiredError)){
                throw new FooError("Incorrect token");
            }
            if (!decoded){
                return Promise.reject({});
            } else{
                // const user : any = await User.findUnique({ where: { id: decoded.user.id}});
                const user : any =  decoded.user;
                if (!user)
                    throw new FooError("Unknown User");
                decoded.user.token = token;

                delete decoded.user
                return Promise.resolve({...decoded, ...user})
            }
        }
    }catch (e) {
        console.log(e.message);
        return Promise.reject(new FooError(e.m))
    }

}
