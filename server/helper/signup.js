const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const {setDefaultRole}  = require("./role");

async function signUp(req, res, roleSlug, isVerified) {

    let status = {
        success: true,
        message: "singup success"
    }
    
    try {
        await setDefaultRole();
  
        const getAdminRoleId= await prisma.role.findUnique({
        where: {
            slug: roleSlug,
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
            role_id: getAdminRoleId.id,
            is_verified: isVerified
        }
        });    

        return status;

    } catch (error) {
        status.success = false;
        status.message = error;

        return status;
    }

    

}
  
module.exports = {
    signUp : signUp
};