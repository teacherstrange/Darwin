import bcrypt from 'bcrypt';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';

//Import config
import config from '../../../../config/config';

import {IResponse} from '../../../../types/response.type';
import {Category, Project} from '../main.model';
import {Route, Post, Request, Body, Tags, Security, Get, Path, Query} from "tsoa";

//Import type
import {UserLogin, UserLogout} from '../../auth/types/login.type';
import {Controller} from "../../../../utils/generic/controller";
import {CreateCategoryParams, UpdateCategoryParams} from "../types/category.type";

declare var global: any;

@Tags("Category")
@Route('category')
export class CategoryController extends Controller {

    @Security('Bearer')
    @Post('create')
    public async createCategory (
        @Body() body: CreateCategoryParams,
        @Request() req : any
    ) : Promise<IResponse> {
        try {
            let project = await Project.findFirst({where: { id: body.projectId, userId: req.user.id}})
            if(project) {
                let category = await Category.create({ data: { ...body } })
                if(category)
                    return this.liteResponse(global.responseCode.SUCCESS, category, "Category created successfully");
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The category does not exist !');

            }
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');

        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @Post('update')
    public async updateCategory (
        @Body() body: UpdateCategoryParams,
        @Request() req : any
    ) : Promise<IResponse> {
        try {

            let id = body.id
            delete body.id
            let category = await Category.findUnique({ where: {id: id}})
            if(!category)
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The category does not exist !');
            let project = await Project.findFirst({where: { id: category.projectId, userId: req.user.id}})
            if(project) {
                let category = await Category.update({ data: { ...body }, where: {id: id}})
                if(category)
                    return this.liteResponse(global.responseCode.SUCCESS, category, "Category updated successfully");
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The category does not exist !');
            }
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @Post('delete')
    public async deleteCategory (
        @Body() body: { id: string },
        @Request() req : any
    ) : Promise<IResponse> {
        try {

            let id = body.id
            let category = await Category.findUnique({ where: {id: id}})
            if(!category)
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The category does not exist !');
            let project = await Project.findFirst({where: { id: category.projectId, userId: req.user.id}})
            if(project) {
                let category = await Category.delete({ where: { id: body.id } })
                if(category)
                    return this.liteResponse(global.responseCode.SUCCESS, category, "Category deleted successfully");
                return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The category does not exist !');
            }
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Get('getAll')
    public async getAllCategory (
        @Query() token: string,
    ) : Promise<IResponse> {
        try {
            let project = await Project.findFirst({where: { id: token }})
            if(project) {
            let categories = await Category.findMany({ where: { projectId: project.id } })
            if(categories)
                return this.liteResponse(global.responseCode.SUCCESS, categories, "All categorys");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The category does not exist !');
            }
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'You can access this item !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }


}