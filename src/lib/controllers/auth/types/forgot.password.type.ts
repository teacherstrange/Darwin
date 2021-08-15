import {Email} from "./register.type";


export interface ResetPasswordParams{
    /**
     * This is a description of a special string property
     *
     * @example 1440Y467rVOU1Cu1
     * @minLength 3 The token must be greater than 3
     */
    token: string,

    password: string,

    repeatPassword: string,

    email: Email,


}

export interface forgotPasswordParams{
    email: Email,
}