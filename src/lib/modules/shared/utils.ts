import {expressAuthentication} from "../auth/middlewares/auth";
import {Context} from "../../../utils/generic/context";

export const retrieveToken = async (context: Context) => {
    context.user = await expressAuthentication(context.req, "Bearer");
    return context;
}