import projectResolvers from "./resolvers/project.resolver";
import postResolvers from "./resolvers/post.resolver";
import categoryResolvers from "./resolvers/category.resolver";
import commentResolvers from "./resolvers/comment.resolver";

export default {
    query: {
        ...projectResolvers.query,
        ...postResolvers.query,
        ...categoryResolvers.query,
        ...commentResolvers.query
    },
    mutation: {
        ...projectResolvers.mutation,
        ...postResolvers.mutation,
        ...categoryResolvers.mutation,
        ...commentResolvers.mutation
    },
    others: {
        ...categoryResolvers.others,
        ...projectResolvers.others,
        ...postResolvers.others,
        ...commentResolvers.others,
    }
}