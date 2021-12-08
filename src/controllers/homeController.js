import db from '../models/index';
import CRUDsevice from '../services/CRUDservices'


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        //console.log(data);
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.error(e);
    }
    //res.send("Hello world from Controller!")
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {

    let message = await CRUDsevice.createNewUser(req.body);
    console.log(message);
    //console.log(req.body);      
    return res.send('Create user successfully !');

}
let showCRUD = async (req, res) => {
    let data = await CRUDsevice.getAllUser();
    // console.log('---------------');
    // console.log(data);
    // console.log('---------------');
    return res.render('showCRUD.ejs', {
        dataTable: data
    });
}
let geteditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let dataUserEdit = await CRUDsevice.getUserById(userId);
        return res.render('editCRUD.ejs', {
            dataUser: dataUserEdit
        })
    }
    else {
        return res.send('User not found !');
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    //console.log(data);
    let allUsers = await CRUDsevice.updateUser(data);
    return res.render('showCRUD.ejs', {
        dataTable: allUsers
    });
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    //console.log(id);
    if (id) {
        await CRUDsevice.deleteUserById(id);
        return res.send('Delete user successfully !')
    } else {
        return res.send('No user deleted !')
    }

}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    showCRUD: showCRUD,
    geteditCRUD: geteditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}