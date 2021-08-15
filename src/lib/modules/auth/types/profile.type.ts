import {Email} from "./register.type";

export interface UpdateProfileParams{
    /**
     * This is a description of a special string property
     *
     * @example "Doe"
     * @minLength 3 The firstname must be greater than 3
     * @maxLength 20 The firstname must be less than 20
     */
    username: string,
    /**
     * This is a description of a special string property
     *
     * @example "John"
     * @minLength 3 The lastname must be greater than 3
     * @maxLength 20 The lastname must be less than 20
     */
    role: string,

    /**
     * This is a description of a special string property
     *
     * @example "John"
     * @minLength 3 The lastname must be greater than 3
     * @maxLength 20 The lastname must be less than 20
     */
    company: string,

}

export interface UpdatePasswordParams{
    /**
     * This is a description of a special string property
     *
     * @example 123456
     * @minLength 6 The password must be greater than 6 character
     */

    password: string,

    lastPassword: string,

}

export interface UpdateEmailParams{

    /**
     * This is a description of a special string property
     *
     * @example 1440Y467rVOU1Cu1
     * @minLength 6 The firstname must be greater than 3
     * @maxLength 6 The firstname must be less than 20
     */
    token: string,

    /**
     * This is a description of a special string property
     *
     * @example 123456
     * @minLength 6 The password must be greater than 6 character
     */

    email: Email,


}

export interface UpdateEmailNotificationParams {
    /**
     * This is a description of a special string property
     *
     * @example 123456
     * @minLength 6 The password must be greater than 6 character
     */

    email: Email,
}