import User from "../../models/User";

export default {
  Query: {
    user: async (parent, { _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    users: async (parent, args, context, info) => {
      return await User.find({})
        .populate()
        .exec();
    },
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = await new User(user);

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
  },
};
