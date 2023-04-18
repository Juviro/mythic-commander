import { makeExecutableSchema } from 'graphql-tools';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';

import resolvers from './resolvers';

const schema = readFileSync(`${__dirname}/schema.graphql`).toString();

export default makeExecutableSchema({
  typeDefs: gql([schema]),
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
