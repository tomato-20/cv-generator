const prepareProfileUpdateData = (data, userId) => {
    try {
        return {
            ...data,
            updatedAt: new Date(),
            updatedBy: userId,
        }
    } catch (error) {
        throw error
    }
}

module.exports = prepareProfileUpdateData
