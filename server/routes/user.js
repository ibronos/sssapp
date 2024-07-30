const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");
const prisma = new PrismaClient();
const {signUp}  = require("../helper/signup");


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
    const isVerified = 1;
    let singupFunc = await signUp(req, res, roleSlug, isVerified);
  
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
            is_verified: true,
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

router.route("/user").post(auth, async function (req, res) {

    const roleSlug = req.body.role;
    const isVerified = req.body.is_verified;
    let singupFunc = await signUp(req, res, roleSlug, isVerified);
  
    return res.json(
        {
            success: singupFunc.success,
            message: singupFunc.message,
            data: {}
        }
    );
  
});

router.route("/user/:id").get(auth, async function (req, res) {

    const user = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
        select: {
            email: true,
            name: true,
            password: true,
            role: true,
            is_verified: true
        },
      })
  
    return res.json(
        {
            success: true,
            message: "user",
            data: user
        }
    );
  
});

router.route("/user/:id").patch(auth, async function (req, res) {

    let passUpdate;

    if( req.body.password && req.body.password != "" ){
        passUpdate = await bcrypt.hash(password, Number(process.env.BCRYPT_HASH));
    } else {
        const userPass = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        passUpdate = userPass?.password;
    }

    const getUSerRoleId = await prisma.role.findUnique({
        where: {
            slug: req.body.role,
        },
        select: {
            id: true
        },
    })

    const user = await prisma.user.update({
        where:{
            id: Number(req.params.id)
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            password: passUpdate,
            role_id: getUSerRoleId.id,
            is_verified: req.body.is_verified
        }
    });
  
    return res.json(
        {
            success: true,
            message: "user",
            data: user
        }
    );
  
});

router.route("/user/:id").delete(auth, async function (req, res) {
    const user = await prisma.user.delete({
        where:{
            id: Number(req.params.id)
        }
    });

    return res.json(
        {
            success: true,
            message: "user",
            data: user
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