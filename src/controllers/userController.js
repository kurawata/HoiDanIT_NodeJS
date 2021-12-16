import req from 'express/lib/request';
import userService from '../services/userServices';


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter !'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    // 1.check email exist
    // 2.compare password
    // 3.return userInfor
    // 4.access_token: JWT
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    try {
        let id = req.query.id; // ALL, id 
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters',
                users: []
            })
        }
        let users = await userService.getAllUsers(id);
        console.log(users);
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            users: users
        })
    } catch (e) {
        console.log(e);
    }
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    console.log('Du lieu truyen:', data);
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    // console.log('Tim id user xóa:', id);
    if (!id) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing required parameter'
        })
    }
    let message = await userService.deleteUser(id);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser

}