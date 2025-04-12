import { where } from "sequelize";
import db from "../models/index";
const getTopDoctorHome = async (limit) => {
  try {
    let users = await db.User.findAll({
      limit: limit,
      where: { roleId: "R2" },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      errCode: 0,
      data: users,
    };
  } catch (e) {
    return e;
  }
};
const getAllDoctor = async () => {
  try {
    let doctors = await db.User.findAll({
      where: { roleId: "R2" },
      attributes: {
        exclude: ["password", "image"],
      },
    });
    return {
      errCode: 0,
      data: doctors,
    };
  } catch (err) {
    return err;
  }
};
const saveDetailInfoDoctor = async (dataBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dataBody);

      if (
        !dataBody.doctorId ||
        !dataBody.contentHTML ||
        !dataBody.contentMarkdown
      ) {
        resolve({
          errCode: -1,
          errMessage: "Missing Parameter",
        });
      } else {
        await db.Markdown.create({
          contentHTML: dataBody.contentHTML,
          contentMarkdown: dataBody.contentMarkdown,
          description: dataBody.description,
          doctorId: dataBody.doctorId,
        });
        resolve({
          errCode: 0,
          errMessage: "Save info doctor succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getDoctorDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data) {
          if (data?.image) {
            data.image = new Buffer(data.image, "base64").toString("binary");
          }
        }
        if (!data) data = [];
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getTopDoctorHome,
  getAllDoctor,
  saveDetailInfoDoctor,
  getDoctorDetail,
};
