import mongoose from "mongoose";

interface Task {
  title: string;
  isCompleted: boolean;
}

const taskSchema = new mongoose.Schema<Task>({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },

});

const taskModel: mongoose.Model<Task> = mongoose.model<Task>("task", taskSchema);

export default taskModel;
