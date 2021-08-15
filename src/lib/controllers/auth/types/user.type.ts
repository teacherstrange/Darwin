import {Email} from './register.type'

export interface UserCreateParams{
    /**
     * This is a description of a special string property
     *
     * @example "John Doe"
     * @minLength 3 The firstname must be greater than 3
     * @maxLength 20 The firstname must be less than 20
     */
    name: string;


    email: Email;

    /**
     * This is a description of a special string property
     *
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    password: string;


}

export interface UserUpdateParams {
    /**
     * This is a description of a special string property
     *
     * @example "2k32234kmk12k3l1e"
     */
    id: string

    /**
     * This is a description of a special string property
     *
     * @example "John Doe"
     * @minLength 3 The firstname must be greater than 3
     * @maxLength 20 The firstname must be less than 20
     */
    name?: string;

 
    email?: Email;

    /**
     * This is a description of a special string property
     *
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    password?: string;


}