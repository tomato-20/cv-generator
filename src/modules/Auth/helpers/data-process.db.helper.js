const uuid = require("uuid");

const prepareInsertData = ({data,encryptedPassword, userId}) => {
    try {
        return {
            _id:uuid.v4(),
            Fullname:data.Fullname,
            Email: data.Email.toLowerCase(), //sanitizing using lower case
            Password: encryptedPassword,
            Phone:data.Phone,
            Address:data.Address,
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