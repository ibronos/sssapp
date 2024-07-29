const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function setDefaultRole() {
    
  const totalRole = await prisma.role.count();
  const roleData = [
    { name: 'Admin', slug: 'admin' },
    { name: 'Verifikator', slug: 'verifikator' },
    { name: 'User', slug: 'user' },
  ];

  if( totalRole === 0 ) {
    await prisma.role.createMany({
      data: roleData,
      skipDuplicates: true,
    });   
  }

}
  
module.exports = {
    setDefaultRole : setDefaultRole
};