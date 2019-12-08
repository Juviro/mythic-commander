import "@babel/polyfill";
import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";

import schema from "./graphql";
import { models } from "./graphql/models";
import dbConfig from "./graphql/dbconfig";

const options = {
  port: process.env.PORT || "4000",
  endpoint: "/api/graphql",
  subscriptions: "/api/subscriptions",
  playground: "/api/playground",
};

const context = {
  models,
  pubsub: new PubSub(),
};

mongoose
  .connect(dbConfig.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = new GraphQLServer({
  schema,
  context,
});

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on hport ${port}`);
});
