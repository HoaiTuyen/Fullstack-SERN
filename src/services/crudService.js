import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
const createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassFrom = await hashUserPass(data.password);
      const user = await db.User.create({
        email: data.email,
        password: hashPassFrom,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });

      // resolve('Create Success');
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};
const hashUserPass = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll();
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
const getUserInfoById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateUserData = async (data, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });

      if (user) {
        user.address = data.address;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        await user.save();
        const allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUserData = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });

      if (user) {
        await user.destroy();
        resolve();
      }
      resolve([]);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserData,
};
