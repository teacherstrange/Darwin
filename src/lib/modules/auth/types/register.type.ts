
/**
 * Phone should not contain +, separate code and value with a #. e.g. "+237699850744"
 *
 * @example "+237699850744"
 */
export type Phone = string;


/**
 * Email input. Currently regex does not work due to bug in jsDoc
 *
 * @example "john-deo@example.com"
 */


export type Email = string;

export interface UserCreationParams{
    
    /**
     * This is a description of a special string property
     *
     * @example "john-doe"
     * @minLength 4 The firstname must be greater than 3
     * @maxLength 20 The firstname must be less than 20
     */
     username: string,

    /**
     * This is a description of a special string property
     *
     * @example "john-doe"
     * @minLength 4 The firstname must be greater than 3
     * @maxLength 20 The firstname must be less than 20
     */
    role?: string,

    /**
     * This is a description of a special string property
     *
     * @example "john-doe"
     * @minLength 4 The firstname must be greater than 3
     * @maxLength 20 The firstname must be less than 20
     */
    company?: string,

    email: Email;
    /**
     * This is a description of a special string property
     *
     * @example "asde"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    password: string,
}

export interface VerifyCodeParams{
    /**
     * This is a description of a special string property
     *
     * @example 25cK1Oi5Dl6D11019k5212236dDy8973
     * @minLength 6 The firstname must be greater than 3
     */
    token: string,

}

