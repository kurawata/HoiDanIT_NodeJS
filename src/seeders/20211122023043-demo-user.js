'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'kurawata@gmail.com',
      password: '123456',
      firstName: 'Tri',
      lastName: 'Luu',
      adress: 'US',
      phoneNumber: '0347877329',
      gender: 1,
      image: 'image/avatar.jpg',
      roleId: 'R1',
      positionId: 'doctor',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
