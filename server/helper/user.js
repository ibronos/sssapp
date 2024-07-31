const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

async function getUserData(req, res) {
    
    try {
  
        const token = req.header("x-auth-token");

        if (!token) { 
          return {
              success: false,
              message: "no token",
              data: {}
          };
        }
  
        const verified = jwt.verify(token, process.env.JWT_KEY);
  
        if (!verified) {
          return {
              success: false,
              message: "not verified",
              data: {
                  token: token
              }
          };
        }
  
        const user = await prisma.user.findUnique({ 
            where: { 
              id: verified.id
            },
            include: {
                role: true
            }
        });
  
        if (!user) {
          return {
              success: false,
              message: "user not found",
              data: {
                  token: token
              }
          };
        }

        return {
            success: true,
            message: "user found",
            data: user
        };
        

    } catch (error) {
        // return res.json({
        //     success: false,
        //     message: error,
        //     data: {}
        // });
        console.log(error);
    }

    

}
  
module.exports = {
    getUserData : getUserData
};