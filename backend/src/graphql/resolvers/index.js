import { mergeResolvers } from "merge-graphql-schemas";

import Task from "./Task/";
import User from "./User/";

const resolvers = [Task, User];

export default mergeResolvers(resolvers);
