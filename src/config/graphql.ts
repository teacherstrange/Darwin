import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
const { makeExecutableSchema } = require("@graphql-tools/schema");

import resolvers from "../lib/graphql/index.resolvers"
// Construct a schema, using GraphQL schema language
import typeDefs from  '../../graphql/schema.graphql'
import {Express} from "express";
import config from "./config";

export default async function (app: Express) {

    const server = new ApolloServer({
        schema: makeExecutableSchema({
            typeDefs : [typeDefs],
            resolvers: resolvers,
            //schemaDirectives: directives,
        }),
        introspection: config.NODE_ENV == 'development',
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });
    await server.start();

    server.applyMiddleware({ app, path: `/graphql` })
}
