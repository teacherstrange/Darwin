/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { forgotPasswordController } from './../lib/modules/auth/controllers/forgot.password.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { loginController } from './../lib/modules/auth/controllers/login.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { profileController } from './../lib/modules/auth/controllers/profile.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { authController } from './../lib/modules/auth/controllers/register.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { verifyController } from './../lib/modules/auth/controllers/verify.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './../lib/modules/project/controllers/category.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CommentController } from './../lib/modules/project/controllers/comment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PostController } from './../lib/modules/project/controllers/post.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectController } from './../lib/modules/project/controllers/project.controller';
import { expressAuthentication } from './../lib/modules/auth/middlewares/auth';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IResponse": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"double","required":true},
            "data": {"dataType":"any","required":true},
            "message": {"dataType":"string"},
            "token": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Email": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "forgotPasswordParams": {
        "dataType": "refObject",
        "properties": {
            "email": {"ref":"Email","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordParams": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The token must be greater than 3","value":3}}},
            "password": {"dataType":"string","required":true},
            "repeatPassword": {"dataType":"string","required":true},
            "email": {"ref":"Email","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLogin": {
        "dataType": "refObject",
        "properties": {
            "email": {"ref":"Email","required":true},
            "password": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLogout": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateProfileParams": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The firstname must be greater than 3","value":3},"maxLength":{"errorMsg":"The firstname must be less than 20","value":20}}},
            "role": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The lastname must be greater than 3","value":3},"maxLength":{"errorMsg":"The lastname must be less than 20","value":20}}},
            "company": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The lastname must be greater than 3","value":3},"maxLength":{"errorMsg":"The lastname must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdatePasswordParams": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 6 character","value":6}}},
            "lastPassword": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateEmailParams": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The firstname must be greater than 3","value":6},"maxLength":{"errorMsg":"The firstname must be less than 20","value":6}}},
            "email": {"ref":"Email","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 6 character","value":6}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserCreationParams": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The firstname must be greater than 3","value":4},"maxLength":{"errorMsg":"The firstname must be less than 20","value":20}}},
            "role": {"dataType":"string","validators":{"minLength":{"errorMsg":"The firstname must be greater than 3","value":4},"maxLength":{"errorMsg":"The firstname must be less than 20","value":20}}},
            "company": {"dataType":"string","validators":{"minLength":{"errorMsg":"The firstname must be greater than 3","value":4},"maxLength":{"errorMsg":"The firstname must be less than 20","value":20}}},
            "email": {"ref":"Email","required":true},
            "password": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VerifyCodeParams": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The firstname must be greater than 3","value":6}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VerifyAccount": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCategoryParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "slug": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "projectId": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "cover": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "description": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCategoryParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "slug": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "projectId": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "cover": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "description": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "id": {"dataType":"string","validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCommentParams": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "email": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "postId": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "message": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCommentParams": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "message": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePostParams": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "slug": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "categoryId": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "cover": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "content": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "state": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DRAFT"]},{"dataType":"enum","enums":["PUBLISHED"]},{"dataType":"enum","enums":["ARCHIVED"]}],"required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdatePostParams": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "slug": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "categoryId": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "cover": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "content": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "state": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DRAFT"]},{"dataType":"enum","enums":["PUBLISHED"]},{"dataType":"enum","enums":["ARCHIVED"]}],"required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "id": {"dataType":"string","validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateProjectParams": {
        "dataType": "refObject",
        "properties": {
            "shortUrl": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "description": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateProjectParams": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "shortUrl": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
            "description": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"The password must be greater than 3","value":3},"maxLength":{"errorMsg":"The password must be less than 20","value":20}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/auth/forgotPassword',

            function forgotPasswordController_forgotPassword(request: any, response: any, next: any) {
            const args = {
                    userData: {"in":"body","name":"userData","required":true,"ref":"forgotPasswordParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new forgotPasswordController();


            const promise = controller.forgotPassword.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/resetPassword',

            function forgotPasswordController_resetPassword(request: any, response: any, next: any) {
            const args = {
                    userData: {"in":"body","name":"userData","required":true,"ref":"ResetPasswordParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new forgotPasswordController();


            const promise = controller.resetPassword.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/login',

            function loginController_login(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"UserLogin"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new loginController();


            const promise = controller.login.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/logout',

            function loginController_logout(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"UserLogout"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new loginController();


            const promise = controller.logout.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/profile/update',
            authenticateMiddleware([{"Bearer":[]}]),

            function profileController_update(request: any, response: any, next: any) {
            const args = {
                    userData: {"in":"body","name":"userData","required":true,"ref":"UpdateProfileParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new profileController();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/profile/updatePassword',
            authenticateMiddleware([{"Bearer":[]}]),

            function profileController_updatePassword(request: any, response: any, next: any) {
            const args = {
                    updatePasswordData: {"in":"body","name":"updatePasswordData","required":true,"ref":"UpdatePasswordParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new profileController();


            const promise = controller.updatePassword.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/profile/sendUpdateEmailNotification',
            authenticateMiddleware([{"Bearer":[]}]),

            function profileController_sendUpdateEmailNotification(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new profileController();


            const promise = controller.sendUpdateEmailNotification.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/profile/updateEmail',
            authenticateMiddleware([{"Bearer":[]}]),

            function profileController_updateemail(request: any, response: any, next: any) {
            const args = {
                    userData: {"in":"body","name":"userData","required":true,"ref":"UpdateEmailParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new profileController();


            const promise = controller.updateemail.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/register',

            function authController_register(request: any, response: any, next: any) {
            const args = {
                    userData: {"in":"body","name":"userData","required":true,"ref":"UserCreationParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new authController();


            const promise = controller.register.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/verifyCode',

            function authController_verifyCode(request: any, response: any, next: any) {
            const args = {
                    verifyCodeData: {"in":"body","name":"verifyCodeData","required":true,"ref":"VerifyCodeParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new authController();


            const promise = controller.verifyCode.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/verify/token',

            function verifyController_verify(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"VerifyAccount"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new verifyController();


            const promise = controller.verify.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/category/create',
            authenticateMiddleware([{"Bearer":[]}]),

            function CategoryController_createCategory(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CreateCategoryParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CategoryController();


            const promise = controller.createCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/category/update',
            authenticateMiddleware([{"Bearer":[]}]),

            function CategoryController_updateCategory(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"UpdateCategoryParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CategoryController();


            const promise = controller.updateCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/category/delete',
            authenticateMiddleware([{"Bearer":[]}]),

            function CategoryController_deleteCategory(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CategoryController();


            const promise = controller.deleteCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/category/getAll',

            function CategoryController_getAllCategory(request: any, response: any, next: any) {
            const args = {
                    token: {"in":"query","name":"token","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CategoryController();


            const promise = controller.getAllCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/comment/create',
            authenticateMiddleware([{"Bearer":[]}]),

            function CommentController_createComment(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CreateCommentParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentController();


            const promise = controller.createComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/comment/update',
            authenticateMiddleware([{"Bearer":[]}]),

            function CommentController_updateComment(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"UpdateCommentParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentController();


            const promise = controller.updateComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/comment/delete',
            authenticateMiddleware([{"Bearer":[]}]),

            function CommentController_deleteComment(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentController();


            const promise = controller.deleteComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/comment/getAll',

            function CommentController_getAllComment(request: any, response: any, next: any) {
            const args = {
                    postId: {"in":"query","name":"postId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentController();


            const promise = controller.getAllComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/post/create',
            authenticateMiddleware([{"Bearer":[]}]),

            function PostController_createPost(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CreatePostParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new PostController();


            const promise = controller.createPost.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/post/update',
            authenticateMiddleware([{"Bearer":[]}]),

            function PostController_updatePost(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"UpdatePostParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new PostController();


            const promise = controller.updatePost.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/post/delete',
            authenticateMiddleware([{"Bearer":[]}]),

            function PostController_deletePost(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new PostController();


            const promise = controller.deletePost.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/post/getAll',

            function PostController_getAllPost(request: any, response: any, next: any) {
            const args = {
                    token: {"in":"query","name":"token","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new PostController();


            const promise = controller.getAllPost.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/project/create',
            authenticateMiddleware([{"Bearer":[]}]),

            function ProjectController_createProject(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CreateProjectParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProjectController();


            const promise = controller.createProject.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/project/update',
            authenticateMiddleware([{"Bearer":[]}]),

            function ProjectController_updateProject(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"UpdateProjectParams"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProjectController();


            const promise = controller.updateProject.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/project/delete',
            authenticateMiddleware([{"Bearer":[]}]),

            function ProjectController_deleteProject(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProjectController();


            const promise = controller.deleteProject.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/project/getAll',
            authenticateMiddleware([{"Bearer":[]}]),

            function ProjectController_getAllProject(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ProjectController();


            const promise = controller.getAllProject.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"silently-remove-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
