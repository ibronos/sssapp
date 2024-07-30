const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");
const prisma = new PrismaClient();
const {signUp}  = require("../helper/singup");


router.route("/signin").post( async function (req, res) {

    const user = await prisma.user.findFirst(
        { where: { 
            email: req.body.email
        } },
    );

    if( user &&  (await bcrypt.compare(req.body.password, user.password)) ) {

        const token = jwt.sign({ id: user._id }, "passwordKey");

        return res.json(
            {
                success: true,
                message: "user exist",
                data: {
                    token: token,
                    id: user._id
                }
            }
        );
    }
    

    return res.json(
        {
            success: false,
            message: "email or password invalid",
            data: {}
        }
    );

});

router.route("/signup").post(async function (req, res) {

    const roleSlug = "user";
    let singupFunc = await signUp(req, res, roleSlug);
  
    return res.json(
        {
            success: singupFunc.success,
            message: singupFunc.message,
            data: {}
        }
    );
  
});

router.route("/registeradmin").post(async function (req, res) {

    const roleSlug = "admin";
    let singupFunc = await signUp(req, res, roleSlug);
  
    return res.json(
        {
            success: singupFunc.success,
            message: singupFunc.message,
            data: {}
        }
    );
  
});

router.route("/users").get(auth, async function (req, res) {

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return res.json(
        {
            success: true,
            message: "Admin user created!",
            data: users
        }
    );

});

// TO CHECK IF TOKEN IS VALID
router.post("/tokenisvalid", async (req, res) => {
    
    try {

      const token = req.header("x-auth-token");

      if (!token) { 
        return res.json({
            success: false,
            message: "no token",
            data: {}
        });
      }

      const verified = jwt.verify(token, "passwordKey");
      if (!verified) {
        return res.json({
            success: false,
            message: "not verified",
            data: {
                token: token
            }
        });
      }

      const user = await prisma.user.findFirst(
        { where: { 
            id: req.body.id
        } },
      );

      const role = await prisma.role.findFirst(
        { where: { 
            id: user.role
        } },
      );

      if (!user) {
        return res.json({
            success: false,
            message: "user not found",
            data: {
                token: token
            }
        });
      }

     return res.json({
        success: true,
        message: "user found",
        data: {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: role
            }
        }
     });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }

});


module.exports = router;