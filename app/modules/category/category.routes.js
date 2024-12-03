const { uploadSingle } = require("../../middlewares/upload");
const  CategoryController = require("./category.controller");
const router = require("express").Router();

router.post("/create", uploadSingle, CategoryController.insertIntoDB);
router.get("/", CategoryController.getAllFromDB);
// router.get("/", CategoryController.getDataById);
// router.delete("/:id",  CategoryController.deleteIdFromDB);
router.patch("/:id",  CategoryController.updateOneFromDB);

const CategoryRoutes = router;
module.exports =  CategoryRoutes ;
