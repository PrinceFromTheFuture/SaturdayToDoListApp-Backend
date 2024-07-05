import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
});
const taskModel = mongoose.model("task", taskSchema);
export default taskModel;
