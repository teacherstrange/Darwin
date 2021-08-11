import {Context} from "../../utils/generic/context";
import {DateTimeResolver} from "graphql-scalars";

export default {
    Query: {
        allUsers: (_parent: any, _args: any, context: Context) => {
            return context.db.user.findMany()
        },
            postById: (_parent: any, args: { uuid: string }, context: Context) => {
            return context.db.post.findUnique({
                where: { uuid: args.uuid || undefined }
            })
        },
            feed: (_parent: any, args: {
            searchString: string,
            skip: number,
            take: number,
            orderBy: PostOrderByUpdatedAtInput,
        }, context: Context) => {
            const or = args.searchString ? {
                OR: [
                    { title: { contains: args.searchString } },
                    { content: { contains: args.searchString } }
                ]
            } : {}

            return context.db.post.findMany({
                where: {
                    state: "DRAFT",
                    ...or
                },
                take: args?.take,
                skip: args?.skip,
                orderBy: args?.orderBy
            })
        },
            draftsByUser: (_parent: any, args: { userUniqueInput: UserUniqueInput }, context: Context) => {
            return context.db.user.findUnique({
                where: {
                    uuid: args.userUniqueInput.uuid || undefined,
                    email: args.userUniqueInput.email || undefined,
                },
            }).posts({
                where: {
                    state: "PUBLISHED"
                },
            })
        }
    },
    Mutation: {
        signupUser: (_parent: any, args: { data: UserCreateInput }, context: Context) => {
            const postData = args.data.posts?.map(post => {
                return {
                    title: post.title,
                    content: post.content || '' ,
                    slug: post.slug ?? '',
                    category: {
                        connect: { uuid: post.category },
                    },
                }
            })

            return context.db.user.create({
                data: {
                    username: args.data.name ?? '',
                    email: args.data.email,
                    password: args.data.password,
                    posts: {
                        create: postData
                    }
                },
            })
        },
            createDraft: (_parent: any, args: { data: PostCreateInput }, context: Context) => {
            return context.db.post.create({
                data: {
                    title: args.data.title,
                    content: args.data.content ?? '',
                    slug: args.data.slug ?? '',
                    category: {
                        connect: { uuid: args.data.category },
                    },
                    author: {
                        connect: { uuid: args.data.uuid },
                    },
                },
            })
        },
            togglePublishPost: async (_parent: any, args: { uuid: string }, context: Context) => {
            try {
                const post = await context.db.post.findUnique({
                    where: { uuid: args.uuid || undefined },
                    select: {
                        state: true
                    }
                })

                return context.db.post.update({
                    where: { uuid: args.uuid || undefined },
                    data: { state: "DRAFT" },
                })
            } catch (error) {
                throw new Error(
                    `Post with ID ${args.uuid} does not exist in the database.`,
                )
            }
        },

            deletePost: (_parent: any, args: { uuid: string }, context: Context) => {
            return context.db.post.delete({
                where: { uuid: args.uuid },
            })
        }
    },
    DateTime: DateTimeResolver,
        Post: {
    author: (parent:any, _args: any, context: Context) => {
        return context.db.post.findUnique({
            where: { uuid: parent?.uuid }
        }).author()
    }
},
    User: {
        posts: (parent:any, _args: any, context: Context) => {
            return context.db.user.findUnique({
                where: { uuid: parent?.uuid }
            }).posts()
        }
    }
}

enum SortOrder {
    asc = "asc",
    desc = "desc"
}

enum Status {
    DRAFT = "DRAFT",
    ARCHIVED = "ARCHIVED",
    PUBISHED = "PUBISHED"
}

interface PostOrderByUpdatedAtInput {
    updatedAt: SortOrder
}

interface UserUniqueInput {
    uuid?: string,
    email?: string
}

interface PostCreateInput {
    title: string,
    content?: string,
    category?: string,
    uuid?: string,
    slug?: string,
}

interface UserCreateInput {
    email: string,
    name: string,
    password: string,
    posts?: PostCreateInput[],
}