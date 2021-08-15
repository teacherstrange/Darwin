import {Body, Post, Route, Tags, ValidateError} from "tsoa";
import {forgotPasswordParams, ResetPasswordParams} from "../types/forgot.password.type";
import {generateToken, emailExist, validateEmail} from "../utils";
import {User, ForgotPassword} from "../auth.model";
import Mailer from "../../../../utils/notifications/mail/mail.class";
import bcrypt from "bcrypt";
import config from "./../../../../config/config";
import {Controller} from "../../../../utils/generic/controller";
import {IResponse} from "../../../../types/response.type";

declare var global: any;

@Tags("Auth")
@Route('auth')
export class forgotPasswordController extends Controller{

    // Nombre jour avant expiration du lien

    static expirationTime:number = 2;

    async saveCode(email: string, token: string) {
        let response = await ForgotPassword.create({
            data: {
                email: email,
                token: token,
                expiredAt: new Date(Date.now()+forgotPasswordController.expirationTime*24*3600*1000)
            }
        })
        console.log(response)
        return response !== null;
    }

    public async verifyCode(verifyCodeData: {email: string, token: string}): Promise<any> {
        let response = await ForgotPassword.findFirst({where: verifyCodeData});

        console.log(response)
        return response !== null && response.expiredAt > new Date();

    }

    @Post("forgotPassword")
    public async forgotPassword(
        @Body() userData: forgotPasswordParams
    ): Promise<IResponse> {
        if(userData.email && validateEmail(userData.email)){
            if((await emailExist(userData.email))){
                await this.sanitizeCode(userData.email)
                let token =  generateToken();
                // let token  = await crypto.randomBytes(40);
                // Save the newly created user
                await this.saveCode(userData.email, token);
                // Save the validation token
                await Mailer.sendFromTemplate(userData.email, "Update password" ,"en", "reset.password", {
                    name: "",
                    token: token,
                });
                return this.liteResponse(global.responseCode.SUCCESS, true, "The message has been sent with instructions");
            }else{
                throw new ValidateError({email: {message: `${userData.email} does not exist in our database.` }},"Validation Error");
            }
        }else{
            throw new ValidateError({email: {message: "Invalid email"}},"Validation Error");
        }
    }

    @Post("resetPassword")
    public async resetPassword(
        @Body() userData: ResetPasswordParams
    ): Promise<IResponse> {
        let response = await this.verifyCode({email:userData.email, token: userData.token});
        console.log(response, userData)
        if(response && userData.password === userData.repeatPassword) {
            // Activate the user instance here
            let password = await bcrypt.hash(userData.password, config.SALT)
            await User.update({where: {email: userData.email}, data: {password: password}});
            // await this.activateUser(verifyCodeData);
            return this.liteResponse(global.responseCode.SUCCESS, true, "Password reset successfully")
        }
        else
            return this.liteResponse(global.responseCode.NOT_EXISTS, false, "invalid code or email")

    }

    public async sanitizeCode(email: string) {
        await ForgotPassword.deleteMany({where: {email: email}})
    }
}
