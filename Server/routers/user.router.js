const express = require("express");
const router = express.Router();

const UserApi = require("../controllers/user.controller");

router.post("/login", UserApi.login);
router.post("/register", UserApi.register);
router.get("/:id", UserApi.fetchUserById);

module.exports = router;
