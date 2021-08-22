import bcrypt from 'bcrypt';
import jwt, {JsonWebTokenError} from 'jsonwebtoken';

//Import config
import config from '../../../../config/config';

import {IResponse} from '../../../../types/response.type';
import {Project} from '../project.model';
import {Route, Post, Query, Body, Tags} from "tsoa";

//Import type
import {UserLogin, UserLogout} from '../../auth/types/login.type';
import {Controller} from "../../../../utils/generic/controller";

declare var global: any;

@Tags("Project")
@Route('project')
export class ProjectController extends Controller {

    @Post('create')
    public async createProject (
        @Body() body: UserLogin
    ) : Promise<IResponse> {
        try {
            return this.liteResponse(global.responseCode.EXCEPTION, null, "Test");
        }catch (e) {
            return this.liteResponse(global.responseCode.EXCEPTION, null, e.message);
        }
    }

}