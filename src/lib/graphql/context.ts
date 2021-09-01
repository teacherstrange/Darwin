import {Request} from "express";
import {expressAuthentication} from "../modules/auth/middlewares/auth";

let context = async ({ req }: {req: Request}) => {
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Koa, Lambda, etc.
    //
    // To find out the correct arguments for a specific integration,
    // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

    // Get the user token from the headers.
    let user;
    // Try to retrieve a user with the token
    try{
         user = await expressAuthentication(req, "Bearer");
    } catch (e) {
        console.log(e.m)
         user = null
    }

    // Add the user to the context
    return {
        user
    };
}

export default context;