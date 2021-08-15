import jwt, {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';

//Import config
import config from '../../../../config/config';

import {IResponse} from '../../../../types/response.type';
import {Route, Post, Body, Tags} from "tsoa";

import {VerifyAccount} from '../types/verify.type';
import {Controller} from "../../../../utils/generic/controller";
import {JWTToken, User} from "../auth.model";

declare var global: any;

@Tags("Middleware")
@Route('auth')
export class verifyController extends Controller {
    @Post('verify/token')
    public async verify(
        @Body() body: VerifyAccount
    ) : Promise<IResponse>{
        try {
            let decoded: any = jwt.verify(body.token, config.JWT_SECRET);

            if (decoded instanceof JsonWebTokenError)
                return this.liteResponse(global.responseCode.INVALID_TOKEN, decoded, "Malformed or unknown JWT Token");
            if (decoded instanceof TokenExpiredError)
                return this.liteResponse(global.responseCode.TOKEN_EXPIRED, decoded, "Token expired");

            if (decoded){
                let jwtToken: any = await JWTToken.findFirst({where: {userId: decoded.userId, token: body.token}});

                if (!jwtToken)
                    return this.liteResponse(global.responseCode.INVALID_TOKEN, decoded, "Malformed or unknown JWT Token");
                else{
                    if (jwtToken.destroyed == true){
                        return this.liteResponse(global.responseCode.BLACK_LISTED_TOKEN)
                    }
                    let id: string = decoded.userId;
                    let user = await User.findFirst({ where : {id: id}});
                    if (!user)
                        return this.liteResponse(global.responseCode.USER_NOT_FOUND);
                    return this.liteResponse(global.responseCode.SUCCESS, user);
                }
            }
            return this.liteResponse(global.responseCode.FAILURE);
        }
        catch(e){
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }
}