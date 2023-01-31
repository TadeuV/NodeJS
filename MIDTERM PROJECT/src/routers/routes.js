const express = require(`express`);
const path = require(`path`)
const router = express.Router();


const {getAllGroceries,getInsertGrocery,postInsertGrocery,getEditGroceryById,postEditGroceryById,deleteGrocery} = require(`../controller/groceries.controller`);


router.get(`/list`,getAllGroceries)

router.get(`/edit/:id`,getEditGroceryById)
router.post(`/edit/:id`,postEditGroceryById)

router.get(`/insert`,getInsertGrocery)
router.post(`/insert`,postInsertGrocery)

router.delete(`/delete/:id`,deleteGrocery)


module.exports=router;