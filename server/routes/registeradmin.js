const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt =  require("bcrypt");
 
const router = express.Router(); 

const prisma = new PrismaClient();
 
router.route("/registeradmin").post(async function (req, res) {

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

  const getAdminRoleId= await prisma.role.findUnique({
    where: {
      slug: 'admin',
    },
    select: {
      id: true
    },
  })

  await prisma.user.create({
    data:{
        email: req.body.email,
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_HASH)),
        roleId: getAdminRoleId.id
    }
  });

  return res.json(
      {
          success: true,
          message: "Admin user created!",
          data: {}
      }
  );

});

module.exports = router;