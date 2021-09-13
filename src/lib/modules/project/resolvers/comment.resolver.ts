import {Context} from "../../../../utils/generic/context";
import {CommentController} from "../controllers/comment.controller";
import {CreateCommentParams, UpdateCommentParams} from "../types/comment.type";
import {retrieveToken} from "../../shared/utils";
import {Post, Project} from "../main.model";


export default {
    query: {
        getComments:  async (_parent: any, args: {  postId: string  }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CommentController()).getAllComment(args.postId);
        },
    },
    mutation: {
        createComment: async (_parent: any, args: { input: CreateCommentParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CommentController()).createComment(args.input);
        },
        updateComment: async (_parent: any, args: { input: UpdateCommentParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CommentController()).updateComment(args.input, context);
        },
        deleteComment: async (_parent: any, args: { input: { id: string } }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CommentController()).deleteComment(args.input, context);
        },
    },
    others: {
        Comment: {
            post: (comment: any)=>{
                return Post.findMany({where:  {id: comment.postId}})
            }
        }
    }
}