import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import taskModel from "./taskModel.js";
import { nanoid } from "nanoid";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
configDotenv();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const initilazation = () => {
  const port = process.env.PORT || 3000;
  const mongoDbConnectionString = process.env.DB_CONNECTION_STRING;

  app.listen(port, async () => {
    console.log(`server is up and running on port ${port}`);
    await mongoose.connect(mongoDbConnectionString!);
  });
};
initilazation();

app.get("/", async (req, res) => {
  const allTasksDocuments = await taskModel.find();
  const allTasks = allTasksDocuments.map((task) => {
    const { _id, title, isCompleted } = task;
    return { _id, title, isCompleted };
  });
  res.json(allTasks);
});

app.post("/", async (req, res) => {
  const taskTitle: string = req.body.title;
  console.log(taskTitle);
  const createdTask = await new taskModel({
    isCompleted: false,
    title: taskTitle,
  }).save();
  res.json(createdTask);
});

app.patch("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const newState: boolean = req.body.newState;
  const taskDocument = await taskModel.findById(taskId);
  taskDocument!.isCompleted = newState;
  const newTaskDocument = await taskDocument!.save();
  res.json(newTaskDocument);
});

app.delete("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  await taskModel.findByIdAndDelete(taskId);
  res.send("newTaskDocument");
});
