const express = require('express')
const createInstructor = require('./createInstructor')
const router = express.Router()

router.post('/', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const { instructorId } = await createInstructor(name, email, password)
        res.json({
            instructorId
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router