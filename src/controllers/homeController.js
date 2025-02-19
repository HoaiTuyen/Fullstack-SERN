import { Logger } from 'sass';
import db from '../models/index'
import CRUDService from '../services/crudService'
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return res.render("layout/homePage.ejs", {Users: JSON.stringify(data)});
    } catch (e) {
        console.log(e);
    }
    
}
const getCRUD = async (req, res) => { 
    return res.render("crud.ejs")
}
const postCRUD = async (req, res) => { 
    const user = {
        ...req.body,
        roleId: req.body.roleid || req.body.roleId
    };
    const data = await CRUDService.createUser(user);
    console.log(data);
    
    return res.send("POSST")
    
}
const displayGetCRUD = async (req, res) => { 
    const data = await CRUDService.getAllUser();
    return res.render("display-crud.ejs", {Users: data});
    
}
const getEditCRUD = async (req, res) => { 
    const idUser = req.query.id;
    if(idUser) {
        const data = await CRUDService.getUserInfoById(idUser);
        
        return res.render("edit-crud.ejs", {UserEdit: data});
    } else {
        return res.send("Not Found");
    }
}
const putCRUD = async (req, res) => {
    let data = req.body;
    let id = req.query.id
    const users = await CRUDService.updateUserData(data, id);
    return res.render("display-crud.ejs", {Users: users});
}
const deleteCRUD = async (req, res) => { 
    const {id} = req.query;
    if(id) {
        await CRUDService.deleteUserData(id);
        return res.send("Delete Success")
    } else return res.send("User not found");
}
module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
}