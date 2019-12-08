import { mergeTypes } from "merge-graphql-schemas";

import Task from "./Task/";
import User from "./User/";

const typeDefs = [Task, User];

export default mergeTypes(typeDefs, { all: true });
