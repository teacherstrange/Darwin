
export interface CreateCategoryParams{
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
    slug: string,

    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    projectId: string,

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
    description: string,

}

export interface UpdateCategoryParams extends CreateCategoryParams{
    /**
     * This is a description of a special string property
     *
     * @example "password"
     * @minLength 3 The password must be greater than 3
     * @maxLength 20 The password must be less than 20
     */
    id?: string,

}

