import {Context} from "../../utils/generic/context";
import {DateTimeResolver} from "graphql-scalars";
import authResolvers from "../modules/auth/auth.resolver";
import mainResolvers from "../modules/project/main.resolver";
import {Post} from "../modules/project/main.model";
export default {
    Query: {
        ...authResolvers.query,
        ...mainResolvers.query
    },
    Mutation: {
        ...authResolvers.mutation,
        ...mainResolvers.mutation
    },
    ...mainResolvers.others
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