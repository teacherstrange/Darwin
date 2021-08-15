import {UpdatePasswordParams, UpdateEmailParams, UpdateProfileParams} from "../types/profile.type";
import {generateToken} from "../utils";
import {Body, Post, Request, Route, Security, Tags, ValidateError} from "tsoa";
import Mailer from "./../../../../utils/notifications/mail/mail.class"
import {User} from "../auth.model";

import config from "./../../../../config/config";
import {forgotPasswordController} from "./forgot.password.controller";
import bcrypt from "bcrypt";
import {Controller} from "../../../../utils/generic/controller";
import {IResponse} from "../../../../types/response.type";

declare var global: any;

@Tags("Profile")
@Security('Bearer')
@Route('auth/profile')
export class profileController extends Controller{

    private static salt: number = config.SALT;
    public forgotPassword = new forgotPasswordController();

    @Post("update")
   public async update(
        @Body() userData: UpdateProfileParams,
        @Request() req : any
    ): Promise<IResponse> {
        // Verify of the user exist from the token and get the _id
        let _id: string = req.user.id;
        if(_id){
            // Update the user instance
            const user = await User.update({where: {id: _id}, data: {
                    username: userData.username,
                    role: userData.role,
                    company: userData.company,
                }});
            if (!user)
                return this.liteResponse(global.responseCode.EXCEPTION, null, "Exception occured.");
            return this.liteResponse(global.responseCode.SUCCESS, user, "Profile updated with success");
        }else{
            throw new ValidateError({email: {message: `message` }},"Validation Error");
        }

    }

    @Post("updatePassword")
    public async updatePassword(
        @Body() updatePasswordData: UpdatePasswordParams,
        @Request() req : any
    ): Promise<IResponse> {
        // Verify of the user exist from the token and get the _id than verify the last pass and the new password
        let _id: string = req.user.id;
        let user:any = await User.findUnique({where: {id: _id}})
        const valid : boolean | null = await bcrypt.compare(updatePasswordData.lastPassword, user.password);
        if(valid){
            let password = await bcrypt.hash(updatePasswordData.password, profileController.salt)

            // Update the user instance
            await User.update({where: {id: _id}, data: {
                password: password,
            }});
            return this.liteResponse(global.responseCode.SUCCESS, null, "Password updated successfully");
        }else{
            throw new ValidateError({lastpassword: {message: `The last password does not match` }},"Validation Error");
        }
    }

    @Post("sendUpdateEmailNotification")
    public async sendUpdateEmailNotification(
        @Request() req : any
    ): Promise<IResponse> {
        let code =  generateToken();
        let user = req.user;
        if(user) {
            await this.forgotPassword.sanitizeCode(user.email);
            await this.forgotPassword.saveCode(user.email, code);
            // Save the validation code
            await Mailer.sendFromTemplate(user.email, "Your email have been updated", "en", "update.email", {
                code: code,
            });
            return this.liteResponse(global.responseCode.SUCCESS, null, "Message sent successfully");

        }else {
            return this.liteResponse(global.responseCode.NOT_EXISTS, false, "Your account is not linked to this email number")

        }

    }

    @Post("updateEmail")
    public async updateemail(
        @Body() userData: UpdateEmailParams,
        @Request() req : any
    ): Promise<IResponse> {
        try {
            let _id = req.user._id;
            let response = await this.forgotPassword.verifyCode({email:req.user.email, token: userData.token});
            if(response) {
                // Activate the user instance here
                let user = await User.update({ where: {id: _id}, data: {email: userData.email}});
                // await this.activateUser(verifyCodeData);
                return this.liteResponse(global.responseCode.SUCCESS, user, "email reset successfully")
            }
            else
                return this.liteResponse(global.responseCode.NOT_EXISTS, false, "invalid code or email")
        }catch (e) {
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message)
        }
    }

}
