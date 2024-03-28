import { ApolloServer } from "@apollo/server"                      //this package is imported to start a server
import { startStandaloneServer } from "@apollo/server/standalone"  //this package is importrd to start a server

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
})

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`)