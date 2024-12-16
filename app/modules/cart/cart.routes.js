const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const CartController = require("./cart.controller");
const router = require("express").Router();

router.post("/create",  CartController.insertIntoDB);
router.get("/", CartController.getAllFromDB);
router.get("/:id", CartController.getDataById);
router.delete("/:id", CartController.deleteIdFromDB);
router.patch("/:id", CartController.updateOneFromDB);

const CartRoutes = router;
module.exports =  CartRoutes ;
