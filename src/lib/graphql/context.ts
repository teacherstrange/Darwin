import {Request} from "express";
import {expressAuthentication} from "../modules/auth/middlewares/auth";

let context = async ({ req }: {req: Request}) => {
    // Get the user token from the headers.
    /**let user;
    try{
         user = await expressAuthentication(req, "Bearer");
    } catch (e) {
        console.log(e.m)
         user = null
    }*/

    // Add the user to the context
    return {
        // user,
        req
    };
}

export default context;