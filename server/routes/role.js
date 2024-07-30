const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router(); 
const prisma = new PrismaClient();

router.route("/roles").get(async function (req, res) {

  const roles = await prisma.role.findMany({});
  
  return res.json(
      {
          success: true,
          message: "roles",
          data: roles
      }
  );

});

module.exports = router;
