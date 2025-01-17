const { uploadSingle } = require("../../middlewares/upload");
const  SubCategoryItemController = require("./subCategoryItem.controller");
const router = require("express").Router();

router.post("/create", uploadSingle, SubCategoryItemController.insertIntoDB);
router.get("/", SubCategoryItemController.getAllFromDB);
// router.get("/", CategoryController.getDataById);
// router.delete("/:id",  CategoryController.deleteIdFromDB);
router.patch("/:id",  SubCategoryItemController.updateOneFromDB);

const SubCategoryItemRoutes = router;
module.exports =  SubCategoryItemRoutes ;
