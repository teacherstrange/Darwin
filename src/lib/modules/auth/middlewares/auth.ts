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
        console.log(securityName)
        if (securityName === "Bearer"){
            const token : any = req.body.authorization || req.query.authorization || req.headers["authorization"];
            if (!token)
                throw new FooError("Token not found");

            const decoded: any = jwt.verify(token, config.JWT_SECRET);
            console.log(decoded)
            if (decoded instanceof (JsonWebTokenError || TokenExpiredError)){
                throw new FooError("Incorrect token");
            }

            if (!decoded){
                return Promise.reject({});
            } else{
                const params = scopes ? scopes : [];
                const user : any = await User.findUnique({ where: { id: decoded.id}});

                if (!user)
                    throw new FooError("Unknown User");
                return Promise.resolve({...decoded, ...user})
            }
        }
    }catch (e) {
        return Promise.reject(new FooError(e.m))
    }

}
