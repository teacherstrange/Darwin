import {Email} from './register.type';

export interface UserLogin{
    email: Email;
    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    password: string,

}

export interface UserLogout{
    /**
     * This is a description of a special string property
     *
     * @example "oi23n4OAIOES234kjdf.ksdbfi34i2bbekbq.asdi23bedsad823bws-_2"
     */
    token: string;
}
