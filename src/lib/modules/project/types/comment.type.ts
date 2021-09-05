
export interface CreateCommentParams{
    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    name: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    email: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    postId: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    message: string,


}

export interface UpdateCommentParams{
    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    id?: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    message: string,
}

