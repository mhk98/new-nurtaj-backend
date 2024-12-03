const { uploadSingle } = require("../../middlewares/upload");
const  SubCategoryController = require("./subCategory.controller");
const router = require("express").Router();

router.post("/create", uploadSingle, SubCategoryController.insertIntoDB);
// router.get("/", SubCategoryController.getAllFromDB);
// router.get("/", CategoryController.getDataById);
// router.delete("/:id",  CategoryController.deleteIdFromDB);
router.patch("/:id",  SubCategoryController.updateOneFromDB);

const SubCategoryRoutes = router;
module.exports =  SubCategoryRoutes ;
