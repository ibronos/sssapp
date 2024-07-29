const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

  connectToServer: async function (callback) {

    try {
      await prisma.$connect();
      console.log(`Database successfully connected!`);
    } catch (e) {
      console.log("Database connection error:");
      console.error(e);
      return false;
    }

    return true;
  }

};