import bcrypt from 'bcrypt';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';

//Import config
import config from '../../../../config/config';

import {IResponse} from '../../../../types/response.type';
import {Project} from '../main.model';
import {Route, Post, Request, Body, Tags, Security, Get} from "tsoa";

//Import type
import {UserLogin, UserLogout} from '../../auth/types/login.type';
import {Controller} from "../../../../utils/generic/controller";
import {CreateProjectParams, UpdateProjectParams} from "../types/project.type";

declare var global: any;

@Tags("Project")
@Route('project')
export class ProjectController extends Controller {

    @Security('Bearer')
    @Post('create')
    public async createProject (
        @Body() body: CreateProjectParams,
        @Request() req : any
    ) : Promise<IResponse> {
        try {
            if(["BLOG", "ECOMMERCE", "SITE", "OTHER"].indexOf(body.type) == -1) {
                return this.liteResponse(global.responseCode.VALIDATION_ERROR, null, 'Please provide an existing project type!');
            }
            let project = await Project.create({ data: { ...body, userId: req.user.id } })
            if(project)
                return this.liteResponse(global.responseCode.SUCCESS, project, "Project created successfully");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The project does not exist !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @Post('update')
    public async updateProject (
        @Body() body: UpdateProjectParams,
        @Request() req : any
    ) : Promise<IResponse> {
        try {
            let id = body.id
            delete body.id
            let project = await Project.update({ data: { ...body }, where: {id: id}})
            if(project)
                return this.liteResponse(global.responseCode.SUCCESS, project, "Project updated successfully");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The project does not exist !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @Post('delete')
    public async deleteProject (
        @Body() body: { id: string },
        @Request() req : any
    ) : Promise<IResponse> {
        try {
            let project = await Project.delete({ where: { id: body.id } })
            if(project)
                return this.liteResponse(global.responseCode.SUCCESS, project, "Project deleted successfully");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The project does not exist !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

    @Security('Bearer')
    @Get('getAll')
    public async getAllProject (
        @Request() req : any
    ) : Promise<IResponse> {
        try {
            let projects = await Project.findMany({ where: { userId: req.user.id }})
            if(projects)
                return this.liteResponse(global.responseCode.SUCCESS, projects, "All user projects");
            return this.liteResponse(global.responseCode.NOT_EXISTS, null, 'The project does not exist !');
        }catch (e: any) {
            throw  e;
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }


}