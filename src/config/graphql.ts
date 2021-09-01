import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
const { makeExecutableSchema } = require("@graphql-tools/schema");

import resolvers from "../lib/graphql/resolvers"
import context from "../lib/graphql/context"
// Construct a schema, using GraphQL schema language
import typeDefs from  '../../graphql/schema.graphql'
import authDefs from  '../../graphql/auth.graphql'
import {Express} from "express";
import config from "./config";

export default async function (app: Express) {

    const server = new ApolloServer({
        schema: makeExecutableSchema({
            typeDefs : [typeDefs, authDefs],
            resolvers: resolvers,
            //schemaDirectives: directives,
        }),
        introspection: config.NODE_ENV == 'development',
        context: context,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });
    await server.start();

    server.applyMiddleware({ app, path: `/graphql` })
}
