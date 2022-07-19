const router = require("express").Router();

const template = require("./templateList");

router.get("/lists", template.getTemplateLists);
 
module.exports=router;