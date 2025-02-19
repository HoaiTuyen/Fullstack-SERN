import bcrypt from "bcryptjs";
import db from '../models/index'
let handleUserLogin = (email, pass) => {
    return new Promise( async(resolve, reject) => {
        try {
            
            const user = await db.User.findOne({
                where: { email: email}
            });
            if(user) {
                const passwordCheck = await bcrypt.compareSync(pass,user.password);
                if(!passwordCheck) {
                    resolve({
                        errCode: 2,
                        errMessage: "Email/Pass không hợp lệ"
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: "Login Success",
                        user: {
                            email: user.email,
                            roleId: user.roleId
                        }
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Email/Pass không hợp lệ",
                })
            }
            
        } catch(e) {
            
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin
}