import bcrypt from 'bcrypt';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';

//Import config
import config from '../../../../config/config';

import {IResponse} from '../../../../types/response.type';
import {User, JWTToken} from '../auth.model';
import {Route, Post, Query, Body, Tags} from "tsoa";

//Import type
import {UserLogin, UserLogout} from '../types/login.type';
import {Controller} from "../../../../utils/generic/controller";

declare var global: any;

@Tags("Auth")
@Route('auth')
export class loginController extends Controller {

    @Post('login')
    public async login (
        @Body() body: UserLogin
    ) : Promise<IResponse> {
        try {
            let user : any = await User.findFirst({where: {email: body.email}});

            if (!user)
                return this.liteResponse(global.responseCode.WRONG_USERNAME, null, 'Email or password incorrect');
            else{
                //Test du nombre de tentative

                const valid : boolean | null = await bcrypt.compare(body.password, user.password);

                if (!valid){
                    return this.liteResponse(global.responseCode.FAILURE, null, "Invalid credentials .");
                }else {
                //Check if user is validated
               // if (user.verified_at){

                    if (!user) return this.liteResponse(global.responseCode.FAILURE, null, "Error occured, can you retry.");
                    delete user.password
                    delete user.createdAt
                    delete user.updatedAt
                    return this.liteResponse(global.responseCode.SUCCESS, user, 'Connect with success.', await this.generateToken(user));
               // }
                // return this.liteResponse(global.responseCode.FAILURE, null, 'Your account is not verify yet.');

                }
            }
        }catch (e) {
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }


    //Generate Token
    public async generateToken (user:any) : Promise<string> {
        const jwtToken = await JWTToken.create({
            data:{
                userId: user.id,
                token: jwt.sign({user}, config.JWT_SECRET, {expiresIn: "24h"}),
                expiredAt: new Date((Date.now() + (24*60*60*1000)))
            }
        })

        if (!jwtToken)
            throw new Error("Exception occured. please try again");
        return jwtToken.token;
    }

    @Post('logout')
    public async logout(
        @Body() body: UserLogout
    ): Promise<IResponse> {
        try{
            let jwtToken: any = await JWTToken.findFirst({where: {token: body.token}});
            if (!jwtToken)
                return this.liteResponse(global.responseCode.INVALID_TOKEN, null, 'unknown token');

            await JWTToken.update({where:{token: body.token}, data: {used: false, destroyed: true}});
            return this.liteResponse(global.responseCode.SUCCESS, null, 'User disconnect with success.');
        }catch (e){
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }
}