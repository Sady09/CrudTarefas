import mongoose from "mongoose";
// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the Task model from the schema
const Task = mongoose.model("Task", taskSchema, "tasks");
export default Task