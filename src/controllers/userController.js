import db from '../models/index'
import userService from '../services/userService'
const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    const data = await userService.handleUserLogin(email, password);
    return res.status(200).json(data)
}

module.exports = {
    handleLogin
}