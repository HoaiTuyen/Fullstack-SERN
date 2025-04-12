import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";
let handleUserLogin = async (email, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email || !pass) {
        reject({
          errCode: 3,
          errMessage: "Email and password are required",
        });
      }

      const user = await db.User.findOne({
        where: { email: email },
      });

      if (user) {
        const passwordCheck = await bcrypt.compareSync(pass, user.password);
        if (!passwordCheck) {
          reject({
            errCode: 2,
            errMessage: "Email/Pass không hợp lệ",
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Login Success",
            user: {
              email: user.email,
              roleId: user.roleId,
              name: user.firstName,
            },
          });
        }
      } else {
        return resolve({
          errCode: 1,
          errMessage: "Email/Pass không hợp lệ",
        });
      }
    } catch (e) {
      reject({
        errCode: -1,
        errMessage: "Không được để trống Email/Passworl, vui lòng thử lại sau!",
      });
    }
  });
};
const getAllUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.User.findAll();
        return resolve(users);
      }
      if (id && id !== "ALL") {
        users = await db.User.findOne({
          where: { id: id },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errCode: 2,
          errMessage: "Email Exists Pr",
        });
      }
      const user = await db.User.findOne({
        where: { email: data.email },
      });

      if (user) {
        resolve({
          errCode: 1,
          errMessage: "Email Exists",
        });
      } else {
        const hashPassFrom = await hashUserPass(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassFrom,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });

        resolve({
          errCode: 0,
          errMessage: "CREATE SUCCESS",
        });
      }
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
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "User not found",
        });
      }
      await db.User.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete Successful",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter ID",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      } else {
        user.address = data.address;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.avatar = data.avatar;
        if (data.avatar) {
          user.image = data.avatar;
        }
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Update Successful",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin,
  getAllUser,
  createUser,
  deleteUser,
  editUser,
  getAllCodeService,
};
