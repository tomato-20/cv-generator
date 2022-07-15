const uuid = require("uuid");

const prepareInsertData = ({data,encryptedPassword, userId}) => {
    try {
        return {
            _id:uuid.v4(),
            fullname:data.fullname,
            email: data.email.toLowerCase(), //sanitizing using lower case
            password: encryptedPassword,
            phone:data.phone,
            address:data.address,
            "createdAt": new Date(),
            createdBy: userId
        }
    } catch (error) {
        throw error;
    }
}

// const prepareUpdateData =()=>{
//     try {
        
//     } catch (error) {
//         throw error;
//     }
// }

module.exports ={
    prepareInsertData,
    // prepareUpdateData
}