const User = require('../models/user')
const asynHandler = require('express-async-handler')

const register = asynHandler(async(req, res) =>{
    const {email, password, firstname, lastname} = req.body
    if(!email || !password || !firstname || !lastname) return res.status(400).json({
        success: false,
        mess: 'Missing inputs'
    })

    const response = await User.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        response
    })
})

module.exports = {
    register
}