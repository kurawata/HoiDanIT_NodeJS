import db from '../models/index';
import bcrypt from 'bcrypt';
import res from 'express/lib/response';
import { reject } from 'bcrypt/promises';


const salt = bcrypt.genSaltSync(10);

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
/////////////////////////////
let hashUserPassword = (pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(pass, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(e);
        }
    })
}
//////////////////////////
function createNewUser(newUser) {
    return new Promise(async (resolve, reject) => {
        try {
            //check exist email
            let check = await checkUserEmail(newUser.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is exist, Plz try another email !',
                });
            }

            let hashPasswordFromBcrypt = await hashUserPassword(newUser.password);
            await db.User.create({
                email: newUser.email,
                password: hashPasswordFromBcrypt,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                adress: newUser.address,
                phoneNumber: newUser.phoneNumber,
                gender: newUser.gender === 1 ? true : false,
                image: newUser.image,
                roleId: newUser.roleId,
                positionId: newUser.positionId
            });
            resolve('Create User successfully !');

        } catch (e) {
            reject(e);
        }
    });
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await db.User.destroy({
                    where: { Id: userId }
                });
                resolve({
                    errCode: 0,
                    message: 'Delete user successfully !'
                })
            }
            resolve({
                errCode: 1,
                message: 'No user to delete'
            })

        } catch (e) {
            reject(e)
        }
    })
}
let updateUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Id: userData.id }
                , raw: false
            })
            //console.log('Tim user xoa:', user.id);
            if (user) {
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.adress = userData.address;

                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update user successfully'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser
}