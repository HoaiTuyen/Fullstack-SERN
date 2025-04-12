import doctorService from "../services/doctorService";
const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let doctors = await doctorService.getTopDoctorHome(+limit);

    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    res.state(200).json({
      errCode: -1,
      message: "Error from Server....",
    });
  }
};
const getAllDoctor = async (req, res) => {
  try {
    let doctor = await doctorService.getAllDoctor();

    return res.status(200).json(doctor);
  } catch (e) {
    return res.state(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
const saveInfoDoctor = async (req, res) => {
  try {
    let result = await doctorService.saveDetailInfoDoctor(req.body);
    console.log(result);

    return res.status(200).json(result);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
const getDetailDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getDoctorDetail(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  getTopDoctorHome,
  getAllDoctor,
  saveInfoDoctor,
  getDetailDoctorById,
};
