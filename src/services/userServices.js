import db from '../models/index';
import bcrypt from 'bcrypt';
import { reject } from 'bcrypt/promises';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user is exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    //compare pass
                    // bcrypt.compareSync(myPlaintextPassword, hash); // true
                    let checkPass = await bcrypt.compareSync(password, user.password);
                    if (checkPass) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        // clear pass when show
                        delete user.password;
                        console.log(user);
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Password is wrong !';
                    }

                } else {
                    userData.errCode = 2;
                    userData.message = 'User is not exist !';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Your account isnt exist !';
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL' || userId === '') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    attributes: {
                        exclude: ['password']
                    },
                    where: { id: userId }
                })
            }
            resolve(users);

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}