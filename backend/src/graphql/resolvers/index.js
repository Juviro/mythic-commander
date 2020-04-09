import * as queries from './queries';
import resolveTypes from './resolveTypes';
import mutations from './mutations';

export default {
  ...queries,
  ...resolveTypes,
  Mutation: mutations,
};
