const validation = async(data) => {
    if(data.trim() == "") return false
    return true
} 

module.exports = validation