const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const OrderController = require("./order.controller");
const router = require("express").Router();

router.post("/create",  OrderController.insertIntoDB);
router.get("/", OrderController.getAllFromDB);
router.get("/:id", OrderController.getDataById);
router.delete("/:id", OrderController.deleteIdFromDB);
router.patch("/:id", OrderController.updateOneFromDB);

const OrderRoutes = router;
module.exports =  OrderRoutes ;
