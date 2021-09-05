import bcrypt from 'bcrypt';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';

//Import config
import config from '../../../../config/config';

import {IResponse} from '../../../../types/response.type';
import {Category, Post as PostModel, Project} from '../main.model';
import {Route, Post, Request, Body, Tags, Security, Get, Query} from "tsoa";

//Import type
import {UserLogin, UserLogout} from '../../auth/types/login.type';
import {Controller} from "../../../../utils/generic/controller";
import {CreatePostParams, UpdatePostParams} from "../types/post.type";

declare var global: any;

@Tags("Post")
@Route('post')
export class PostController extends Controller {

    @Security('Bearer')
    @Post('create')
    public async createPost (
        @Body() body: CreatePostParams,
        @Request() req : any
    ) : Promise<IResponse> {
        try {
            let category = await Category.findFirst({where: { id: body.categoryId, project: {userId: req.user.id}}})
            if(category) {
                let post = await PostModel.create({ data: { ...body } })
                if(post)
                    return this.liteResponse(global.responseCode.SUCCESS, post, "Post created successfully");
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The post does not exist !');

            }
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');

        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @Post('update')
    public async updatePost (
        @Body() body: UpdatePostParams,
        @Request() req : any
    ) : Promise<IResponse> {
        try {

            let id = body.id
            delete body.id
            let post = await PostModel.findFirst({ where: {id: id, category: {project: {userId: req.user.id}}}})
            if(!post)
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The post does not exist !');
            post = await PostModel.update({ data: { ...body }, where: {id: id}})
            if(post)
                return this.liteResponse(global.responseCode.SUCCESS, post, "Post updated successfully");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The post does not exist !');

            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @Post('delete')
    public async deletePost (
        @Body() body: { id: string },
        @Request() req : any
    ) : Promise<IResponse> {
        try {

            let id = body.id
            let post = await PostModel.findFirst({ where: {id: id, category: {project: {userId: req.user.id}}}})
            if(!post)
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The post does not exist !');

            post = await PostModel.delete({ where: { id: body.id } })
            if(post)
                return this.liteResponse(global.responseCode.SUCCESS, post, "Post deleted successfully");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The post does not exist !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Get('getAll')
    public async getAllPost (
        @Query() token: string ,
    ) : Promise<IResponse> {
        try {

            let posts = await PostModel.findMany({ where: { category : { project: { id: token }}}})
            if(posts)
                return this.liteResponse(global.responseCode.SUCCESS, posts, "All posts");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The post does not exist !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }


}