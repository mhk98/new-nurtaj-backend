const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const  BrandController = require("./brand.controller");
const router = require("express").Router();

router.post("/create",  BrandController.insertIntoDB);
router.get("/", BrandController.getAllFromDB);
router.get("/all", BrandController.getAllFromDBWithoutQuery);
router.get("/:id", BrandController.getDataById);
router.delete("/:id",  BrandController.deleteIdFromDB);
router.patch("/:id",  BrandController.updateOneFromDB);

const BrandRoutes = router;
module.exports =  BrandRoutes ;
