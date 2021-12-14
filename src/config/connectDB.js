const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('datlichkhambenhdb', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Ket noi thanh cong.');
    } catch (error) {
        console.error('Ket noi that bai.');
    }
}

module.exports = connectDB;