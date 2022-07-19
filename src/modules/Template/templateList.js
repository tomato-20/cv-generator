const responseHelper = require("../../helpers/responseHelper");

exports.getTemplateLists = async (req, res, next) => {
    try {
      const templateList = await req.db.collection("templates").find().toArray();
        if (templateList){
            return responseHelper.successResponse(res, "Template List", templateList);
        }
    } catch (error) {
        console.log(error)
    }
};