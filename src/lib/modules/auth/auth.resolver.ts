import {Context} from "../../../utils/generic/context";
import {UserCreationParams} from "./types/register.type";
import {authController} from "./controllers/register.controller";


export default {
    query: {
        allUsers:  async (_parent: any, args: { data: UserCreationParams }, context: Context) => {
            return [{
                username: "ltphen",
                password: "test",
                role: "test",
                company: "yo",
                email: "email"
            }]
        },
    },
    mutation: {
        register: async (_parent: any, args: { input: UserCreationParams }, context: Context) => {
            let auth = new authController();
            console.log(args, "lionel")
            return await auth.register(args.input);
        },
    }
}