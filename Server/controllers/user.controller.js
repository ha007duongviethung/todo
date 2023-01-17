const User = require("../models/user.model");

module.exports = class UserApi {
  static async login(req, res) {
    const user = req.body;

    if (!user.email || !user.password)
      res
        .status(400)
        .json({ success: false, message: "Missing email and/or password" });
    try {
      const userLogin = await User.findOne({
        email: user.email,
        password: user.password,
      });

      if (!userLogin)
        res
          .status(400)
          .json({ success: false, message: "Incorrect email and/or password" });

      res.status(200).json({
        success: false,
        message: "User login successfully",
        user: userLogin,
      });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  static async register(req, res) {
    const user = req.body;

    if (!user.email || !user.password) {
      res
        .status(400)
        .json({ success: false, massage: "Missing email and/or password" });
    }

    try {
      const userOld = await User.findOne({ email: user.email });
      if (userOld)
        res.status(400).json({ success: false, message: "User already taken" });

      const newUser = new User({
        full_name: user.full_name,
        email: user.email,
        password: user.password,
      });

      await newUser.save();
      res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  static async fetchUserById(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findOne({ _id: id });
      if (!user)
        res.status(400).json({ success: false, message: "Mising user" });

      res
        .status(200)
        .json({ success: true, message: "Fetch user successfully", user });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};
