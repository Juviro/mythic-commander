import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from './resolvers';

const schema = readFileSync(`${__dirname}/schema.graphql`).toString();

export default makeExecutableSchema({
  typeDefs: gql([schema]),
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
