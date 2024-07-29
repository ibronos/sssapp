const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt =  require("bcrypt");
const router = express.Router(); 
const prisma = new PrismaClient();

router.route("/role").get(async function (req, res) {
  
  return res.json(
      {
          success: true,
          message: "role",
          data: {
            
          }
      }
  );


});

module.exports = router;
