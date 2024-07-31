const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router(); 
const prisma = new PrismaClient();
const auth = require("../middleware/auth");
const {izinDefaultSetup}  = require("../helper/izin");
const {getUserData} = require("../helper/user");

router.route("/izins").get(auth, async function (req, res, next) {

  await izinDefaultSetup();

  const user = await getUserData(req, res, next);
  let izin = {};

  if( user.data.role.slug == "user" ){
    izin = await prisma.izin.findMany({
        where: { 
            user_id: user.data.id
        },
        include: {
            user: true,
            izin_approve: true,
            izin_jenis: true
        }
    });
  } else {
    izin = await prisma.izin.findMany({
        include: {
            user: true,
            izin_approve: true,
            izin_jenis: true
        }
    });
  }


  
  return res.json(
      {
          success: true,
          message: "izin",
          data: izin
      }
  );

});

router.route("/izin").post(auth, async function (req, res, next) {

    await izinDefaultSetup();

    const user = await getUserData(req, res, next);

    if( user.success ){

        const getIzinApproveBySlug = await prisma.izin_approve.findUnique(
            { where: { 
                slug: "menunggu"
            } },
        );

        const izin = await prisma.izin.create({
            data:{
                name: req.body.name,
                detail: req.body.detail,
                user_id: user.data.id,
                izin_jenis_id:  parseInt(req.body.izin_jenis),
                izin_approve_id: getIzinApproveBySlug.id
            }
        }); 

        return res.json(
            {
                success: true,
                message: "izin",
                data: izin
            }
        );
    }
    
    return res.json(
        {
            success: false,
            message: "izin failed",
            data: {}
        }
    );
  
});

router.route("/izin/:id").get(auth, async function (req, res) {

    await izinDefaultSetup();

    const izin = await prisma.izin.findUnique({
        where: {
          id: Number(req.params.id),
        },
        include: {
            user: true,
            izin_approve: true,
            izin_jenis: true
        }
      })
  
    return res.json(
        {
            success: true,
            message: "izin",
            data: izin
        }
    );
  
});

router.route("/izin/:id").patch(auth, async function (req, res, next) {

    const user = await getUserData(req, res, next);

    if( user.success ){
        const izin = await prisma.izin.update({
            where:{
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                detail: req.body.detail,
                // user_id: user.data.id,
                izin_jenis_id: parseInt(req.body.izin_jenis),
                izin_approve_id: parseInt(req.body.izin_approve),
                is_canceled: parseInt(req.body.is_canceled)
            }
        });
      
        return res.json(
            {
                success: true,
                message: "izin",
                data: izin
            }
        );
    }

    return res.json(
        {
            success: false,
            message: "izin failed",
            data: {}
        }
    );


  
});

router.route("/izin/:id").delete(auth, async function (req, res) {
    const izin = await prisma.izin.delete({
        where:{
            id: Number(req.params.id)
        }
    });

    return res.json(
        {
            success: true,
            message: "izin",
            data: {}
        }
    );

});

router.route("/izinjenis").get(auth, async function (req, res) {

    const datas = await prisma.izin_jenis.findMany({});
    
    return res.json(
        {
            success: true,
            message: "izin",
            data: datas
        }
    );
  
});

router.route("/izinapprove").get(auth, async function (req, res) {

    const datas = await prisma.izin_approve.findMany({});
    
    return res.json(
        {
            success: true,
            message: "izin",
            data: datas
        }
    );
  
});

module.exports = router;
