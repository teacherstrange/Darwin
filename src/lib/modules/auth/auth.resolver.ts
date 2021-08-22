import {Context} from "../../../utils/generic/context";
import {UserCreationParams, VerifyCodeParams} from "./types/register.type";
import {authController} from "./controllers/register.controller";
import {loginController} from "./controllers/login.controller";
import {UserLogout} from "./types/login.type";
import {forgotPasswordParams, ResetPasswordParams} from "./types/forgot.password.type";
import {forgotPasswordController} from "./controllers/forgot.password.controller";


export default {
    query: {
        allUsers:  async (_parent: any, args: { data: UserCreationParams }, context: Context) => {
            return [{
                username: "ltphen",
                password: "test",
                role: "test",
                company: "yo",
                email: "email"
            }]
        },
    },
    mutation: {
        register: async (_parent: any, args: { input: UserCreationParams }, context: Context) => {
            return await (new authController()).register(args.input);
        },
        verifyCode: async (_parent: any, args: { input: VerifyCodeParams }, context: Context) => {
            return await (new authController()).verifyCode(args.input);
        },
        login: async (_parent: any, args: { input: UserCreationParams }, context: Context) => {
            return await (new loginController()).login(args.input);
        },
        logout: async (_parent: any, args: { input: UserLogout }, context: Context) => {
            return await (new loginController()).logout(args.input);
        },
        forgotPassword: async (_parent: any, args: { input: forgotPasswordParams }, context: Context) => {
            return await (new forgotPasswordController()).forgotPassword(args.input);
        },
        resetPassword: async (_parent: any, args: { input: ResetPasswordParams }, context: Context) => {
            return await (new forgotPasswordController()).resetPassword(args.input);
        },
    }
}