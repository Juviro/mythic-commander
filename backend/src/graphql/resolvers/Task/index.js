import Task from "../../models/Task";

export default {
  Query: {
    task: async (parent, { _id }, context, info) => {
      return await Task.findOne({ _id })
        .populate("completed.user")
        .exec();
    },
    tasks: async (parent, args, context, info) => {
      return await Task.find({})
        .populate("completed.user")
        .exec();
    },
  },
  Mutation: {
    createTask: async (parent, { task }, context, info) => {
      task.lastDone = task.lastDone || Date.now();
      const newTask = await new Task(task);

      return new Promise((resolve, reject) => {
        newTask.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateTask: async (parent, { _id, task }, context, info) => {
      return new Promise((resolve, reject) => {
        Task.findByIdAndUpdate(_id, { $set: { ...task } }, { new: true })
          .populate("completed.user")
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    completeTask: async (parent, { _id, user }, context, info) => {
      const timestamp = String(Date.now());
      return new Promise((resolve, reject) => {
        Task.findByIdAndUpdate(
          _id,
          {
            $push: {
              completed: { timestamp, user },
            },
          },
          { new: true }
        )
          .populate("completed.user")
          .exec((err, res) => {
            // TODO find a more elegant solution for this
            const populatedUser = res.completed[res.completed.length - 1].user;

            err
              ? reject(err)
              : resolve({
                  _id: res._id,
                  user: populatedUser,
                });
          });
      });
    },
    deleteTask: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Task.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
  },
};
