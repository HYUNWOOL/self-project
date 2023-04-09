import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/UserResolver";

async function startServer() {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1121",
    database: "project",
    entities: [__dirname + "/entity/*.ts"],
    synchronize: true,
  });

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`);
  });
}

startServer();
