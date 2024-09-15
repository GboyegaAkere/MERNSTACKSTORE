async function userDetailsController(req,res) {
    try {
        
    } catch (err) {
        res.status(400).json({
            message : err.mesage || err,
            error : true,
            succes: false
        })
    }
}

module.exports = userDetailsController