import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  //   const post1 = orm.em.create(Post, { title: "my first post" });
  //   await orm.em.persistAndFlush(post1);

  const app = express();
  app.get("/", (req, res) => {
    res.send("hello express");
    console.log(req.url);
  });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};

main().catch((err) => {
  console.error("___________ERROR_____________");
  console.error(err);
});
