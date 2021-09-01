import {Controller} from '../../../../utils/generic/controller';
import {IResponse} from "../../../../types/response.type";
import {UserCreationParams, VerifyCodeParams} from "../types/register.type";
import {sanitizeEmail, usernameExist, emailExist, validateEmail, generateToken} from "../utils";
import Mailer from "../../../../utils/notifications/mail/mail.class"
import bcrypt from "bcrypt";
import config from "../../../../config/config";
import {forgotPasswordController} from "./forgot.password.controller";
import {User, ForgotPassword, JWTToken} from "../auth.model";
declare var global: any;
import {
    Body,
    Tags,
    Post,
    Route,
    ValidateError
} from "tsoa";
import {loginController} from "./login.controller";
declare var global: any;

 
@Tags("Auth")
@Route('auth')
export class authController extends Controller{

   
    private static salt: number = config.SALT;
    private static defaultProfile: string = 'default.jpg';

    public forgotPassword = new forgotPasswordController();
    public login = new loginController();

    @Post("register")
   public async register( 
        @Body() userData: UserCreationParams,
   ): Promise<IResponse> {
        userData.email = sanitizeEmail(userData.email);
        if(userData.email && validateEmail(userData.email)){
            if(!(await emailExist(userData.email))){
                if(!(await usernameExist(userData.username))){
                    let user = await this.sanitizeData(userData);
                    let token =  generateToken();
                    // let token  = await crypto.randomBytes(40);
                    // Save the newly created user
                    let newUser:any = await User.create({data: user});
                    await this.forgotPassword.saveCode(user.email, token);
                    // Save the validation token
                    await Mailer.sendFromTemplate(userData.email, "Welcome to codetree", "en", "welcome", {
                        name: userData.username,
                        token: token,
                    });
                    delete newUser.password
                    delete newUser.createdAt
                    delete newUser.updatedAt

                    return this.liteResponse(global.responseCode.SUCCESS, newUser, "User created successfully", await this.login.generateToken(newUser));
                }else{
                    throw new ValidateError({username: {message: `${userData.username} is already taken, try another username.` }},"Validation Error");
                }
            }
            else{
                throw new ValidateError({email: {message: `${userData.email} is already taken, try another email.` }},"Validation Error");
            }
        }else{
            throw new ValidateError({email: {message: "Incorrect email"}},"Validation Error");
        }
    }

    @Post("verifyCode")
    public async verifyCode(
        @Body() verifyCodeData: VerifyCodeParams
    ): Promise<IResponse> {       
        let activateUser = await this.activateUser(verifyCodeData);
       if(activateUser) {
           return this.liteResponse(global.responseCode.SUCCESS, true, "email validate successfully")
       }
       else
           return this.liteResponse(global.responseCode.NOT_EXISTS, false, "The token is invalid or has expired")
    }

    async sanitizeData(user: any) {
        user.email = sanitizeEmail(user.email)
        user.username = sanitizeEmail(user.username)
        user.password = await bcrypt.hash(user.password, authController.salt)
        user.verifiedAt = null
        // user.profile = authController.defaultProfile
        return user;
    }

    private async activateUser(verifyCodeData: VerifyCodeParams) {
        let item = await ForgotPassword.findFirst({where:{token: verifyCodeData.token}})
        if(item && item.expiredAt >= (new Date()))
            return User.update({ data: {verifiedAt: new Date()}, where: {email: item.email}});
        return false
    }
}
