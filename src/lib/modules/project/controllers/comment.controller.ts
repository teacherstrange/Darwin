import bcrypt from 'bcrypt';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';

//Import config
import config from '../../../../config/config';

import {IResponse} from '../../../../types/response.type';
import {Comment, Post, Project} from '../main.model';
import {Route, Post as P, Request, Body, Tags, Security, Get, Query} from "tsoa";

//Import type
import {UserLogin, UserLogout} from '../../auth/types/login.type';
import {Controller} from "../../../../utils/generic/controller";
import {CreateCommentParams, UpdateCommentParams} from "../types/comment.type";

declare var global: any;

@Tags("Comment")
@Route('comment')
export class CommentController extends Controller {

    @Security('Bearer')
    @P('create')
    public async createComment (
        @Body() body: CreateCommentParams,
    ) : Promise<IResponse> {
        try {
            let post = await Post.findFirst({where: { id: body.postId}})
            if(post) {
                let comment = await Comment.create({ data: { ...body } })
                if(comment)
                    return this.liteResponse(global.responseCode.SUCCESS, comment, "Comment created successfully");
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The comment does not exist !');

            }
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');

        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @P('update')
    public async updateComment (
        @Body() body: UpdateCommentParams,
        @Request() req : any
    ) : Promise<IResponse> {
        try {

            let id = body.id
            delete body.id
            let comment = await Comment.findUnique({ where: {id: id}})
            if(!comment)
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The comment does not exist !');
            comment = await Comment.update({ data: { ...body }, where: {id: id}})
            if(comment)
                return this.liteResponse(global.responseCode.SUCCESS, comment, "Comment updated successfully");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The comment does not exist !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @P('delete')
    public async deleteComment (
        @Body() body: { id: string },
        @Request() req : any
    ) : Promise<IResponse> {
        try {

            let id = body.id
            let comment = await Comment.findFirst({where: { id: body.id, post: { category: { project : { userId: req.user.id }} } }})
            if(!comment)
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The comment does not exist !');
            comment = await Comment.delete({ where: { id: body.id } })
            if(comment)
                return this.liteResponse(global.responseCode.SUCCESS, comment, "Comment deleted successfully");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The comment does not exist !');

            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Get('getAll')
    public async getAllComment (
        @Query() postId: string ,
    ) : Promise<IResponse> {
        try {
            let post = await Post.findFirst({where: { id: postId }})
            if(post) {
                let comments = await Comment.findMany({ where: { postId: post.id } })
                if(comments)
                    return this.liteResponse(global.responseCode.SUCCESS, comments, "All comments");
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The comment does not exist !');
            }
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }


}