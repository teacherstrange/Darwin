import {Context} from "../../../../utils/generic/context";
import {PostController} from "../controllers/post.controller";
import {CreatePostParams, UpdatePostParams} from "../types/post.type";
import {retrieveToken} from "../../shared/utils";
import {Category, Comment, Post} from "../main.model";


export default {
    query: {
        getPosts:  async (_parent: any, args: { data: { token: string } }, context: Context) => {
            context = await retrieveToken(context);
            return await (new PostController()).getAllPost(args.data.token);
        },
    },
    mutation: {
        createPost: async (_parent: any, args: { input: CreatePostParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new PostController()).createPost(args.input, context);
        },
        updatePost: async (_parent: any, args: { input: UpdatePostParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new PostController()).updatePost(args.input, context);
        },
        deletePost: async (_parent: any, args: { input: { id: string } }, context: Context) => {
            context = await retrieveToken(context);
            return await (new PostController()).deletePost(args.input, context);
        },
    },
    others: {
        Post: {
            comments: (post: any)=>{
                return Comment.findMany({where:  {postId: post.id}})
            },
            category: (post: any)=>{
                return Category.findFirst({where:  {id: post.categoryId}})
            }
        }
    }
}