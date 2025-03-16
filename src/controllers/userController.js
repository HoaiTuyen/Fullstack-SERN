import db from "../models/index";
import userService from "../services/userService";
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userService.handleUserLogin(email, password);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      errCode: -1,
      errMessage: error.errMessage,
    });
  }
};
const handleAllUser = async (req, res) => {
  try {
    let id = req.query.id;
    const users = await userService.getAllUser(id);

    return res.status(200).json({
      errCode: 0,
      errMessage: "Success",
      users,
    });
  } catch (error) {}
};

const handleCreateUser = async (req, res) => {
  const message = await userService.createUser(req.body);

  return res.status(200).json(message);
};
const handleEditUser = async (req, res) => {
  const data = req.body;
  const message = await userService.editUser(data);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  const { id } = req.body;

  if (!req.body.id) {
    return res.status().json({
      errCode: 1,
      errMessage: "Missing parameter",
    });
  }
  const data = await userService.deleteUser(id);

  return res.status(200).json(data);
};
const getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);

    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleLogin,
  handleAllUser,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
};
