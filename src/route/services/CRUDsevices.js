import bcrypt from 'bcrypt';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                adress: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === 1 ? true : false,
                image: data.image,
                roleId: data.roleId,
                positionId: data.positionId
            })
            resolve('Create User successfully !');
        } catch (e) {
            reject(e);
        }
    })
    // let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    // console.log('password from sevices with bcrypt:');
    // console.log(hashPasswordFromBcrypt);
}
// tao hashpassword
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

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}
let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = await db.User.findOne({
                where: { Id: id },
                raw: true
            });
            if (dataUser) {
                resolve(dataUser);
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })

}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Id: data.id }
            })
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.adress = data.address

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })

}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Id: id }
            })
            //console.log(user);
            if (user) {
                await user.destroy();
            }
            resolve(); //return

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}