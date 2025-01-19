const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const { uploadSingle } = require("../../middlewares/upload");
const  ProductController = require("./product.controller");
const router = require("express").Router();

router.post("/create", uploadSingle,  ProductController.insertIntoDB);
router.get("/", ProductController.getAllFromDB);
router.get("/all", ProductController.getAllFromDBWithoutQuery);
router.get("/arrival", ProductController.getArrivalDataById);
router.get("/:id", ProductController.getDataById);
router.delete("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), ProductController.deleteIdFromDB);
router.patch("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), ProductController.updateOneFromDB);

const ProductRoutes = router;
module.exports =  ProductRoutes ;
