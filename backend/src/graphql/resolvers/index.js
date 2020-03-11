import * as queries from './queries';
import mutations from './mutations';

export default {
  ...queries,
  Mutation: mutations,
};
