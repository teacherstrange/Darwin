import {Context} from "../../../../utils/generic/context";
import {ProjectController} from "../controllers/project.controller";
import {CreateProjectParams, UpdateProjectParams} from "../types/project.type";
import {retrieveToken} from "../../shared/utils";
import {Category, Comment} from "../main.model";


export default {
    query: {
        getProjects:  async (_parent: any, args: { data: any }, context: Context) => {
            context = await retrieveToken(context);
            return await (new ProjectController()).getAllProject(context);
        },
    },
    mutation: {
        createProject: async (_parent: any, args: { input: CreateProjectParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new ProjectController()).createProject(args.input, context);
        },
        updateProject: async (_parent: any, args: { input: UpdateProjectParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new ProjectController()).updateProject(args.input, context);
        },
        deleteProject: async (_parent: any, args: { input: { id: string } }, context: Context) => {
            context = await retrieveToken(context);
            return await (new ProjectController()).deleteProject(args.input, context);
        },
    },
    others: {
        Project: {
            categories: (project: any)=>{
                return Category.findMany({where:  {projectId: project.id}})
            }
        }
    }
}