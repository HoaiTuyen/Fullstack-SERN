import db from '../models/index'

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return res.render("layout/homePage.ejs", {Users: JSON.stringify(data)});
    } catch (e) {
        console.log(e);
    }
    
}

module.exports = {
    getHomePage
}