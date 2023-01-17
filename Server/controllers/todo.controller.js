const Todo = require("../models/todo.model");

module.exports = class TodoApi {
  static async fetchTodoById(req, res) {
    const id = req.params.id;

    try {
      const todos = await Todo.find({ userId: id }).sort({ status: false });
      res.status(200).json({
        success: false,
        message: "Fetch todo by user successfully",
        todos,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  static async addNewTodo(req, res) {
    const todo = req.body;
    if (!todo.title)
      res.status(400).json({ success: false, message: "Missing title todo" });

    try {
      const todoOld = await Todo.findOne({
        title: todo.title,
        userId: todo.userId,
      });

      if (todoOld)
        res.status(400).json({ success: false, message: "Todo already" });

      const newTodo = new Todo({
        userId: todo.userId,
        title: todo.title,
      });

      await newTodo.save();

      res
        .status(200)
        .json({ success: true, message: "Add todo successfully", newTodo });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  static async updateTodo(req, res) {
    const todo = req.body;

    try {
      const todoUpdate = await Todo.findByIdAndUpdate({ _id: todo._id }, todo);
      if (!todoUpdate)
        res.status(400).json({ success: false, message: "Todo update failed" });

      res.status(200).json({
        success: true,
        message: "Todo update successfully",
        todoUpdate,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  static async deleteTodo(req, res) {
    const id = req.params.id;

    try {
      const todoDelete = await Todo.findByIdAndDelete({ _id: id });
      if (!todoDelete)
        res.status(400).json({ success: false, message: "Delete todo failed" });

      res
        .status(200)
        .json({ success: true, message: "Delete todo successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};
