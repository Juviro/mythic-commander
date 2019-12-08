import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  lastDone: {
    type: String,
  },
  interval: {
    type: String,
  },
  completed: [
    {
      timestamp: { type: String, required: true },
      user: {
        type: ObjectID,
        ref: "User",
        required: true,
      },
    },
  ],
});

export default mongoose.model("Task", TaskSchema);
