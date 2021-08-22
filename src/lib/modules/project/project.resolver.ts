import {Context} from "../../../utils/generic/context";
import {UserCreationParams, VerifyCodeParams} from "./../auth/types/register.type";
import {ProjectController} from "./controllers/project.controller";


export default {
    query: {

    },
    mutation: {
        createProject: async (_parent: any, args: { input: UserCreationParams }, context: Context) => {
            return await (new ProjectController()).createProject(args.input);
        },
    }
}