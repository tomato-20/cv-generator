const prepareDbUpdateData = (data, userId) => {
    if(data?.startDate) data.startDate = new Date(data.startDate)
    if(data?.endDate) data.endDate = data.endDate == 'present' ? 'present' : new Date(data.endDate)
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

module.exports = prepareDbUpdateData
