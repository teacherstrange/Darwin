
export interface CreatePostParams{
    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    title: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    slug: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    categoryId: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    cover: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    content: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    state: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',

}

export interface UpdatePostParams extends CreatePostParams{
    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    id?: string,


}


export interface UpdatePostStateParams{
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
    state: string,
}

