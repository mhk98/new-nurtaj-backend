const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const  ProductController = require("./product.controller");
const router = require("express").Router();

router.post("/create", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), ProductController.insertIntoDB);
router.get("/", ProductController.getAllFromDB);
router.get("/all", ProductController.getAllFromDBWithoutQuery);
router.get("/:id", ProductController.getDataById);
router.delete("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), ProductController.deleteIdFromDB);
router.patch("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), ProductController.updateOneFromDB);

const ProductRoutes = router;
module.exports =  ProductRoutes ;