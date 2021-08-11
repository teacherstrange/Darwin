import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';

import resolvers from "../lib/resolvers"
// Construct a schema, using GraphQL schema language
import typeDefs from  '../../graphql/schema.graphql'
import {Express} from "express";
import config from "./config";


export default async function (app: Express) {

    const server = new ApolloServer({
        typeDefs,
        introspection: config.NODE_ENV == 'development',
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });
    await server.start();

    server.applyMiddleware({ app, path: `/graphql` })
}
