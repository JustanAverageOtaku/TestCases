const Instructor = require("../models/instructor.model.js")

module.exports = async function createInstructor(name, email, password) 
{
    try {

        const existingInstructor = await Instructor.findOne({email: email})

        if (existingInstructor) throw new Error(`Identity theft is a crime`)

        if (email.substring(email.indexOf('@')+1) !== "mail.com") throw new Error('Tsk Tsk, I see thou hast no sense of solidarity to thine blood')

        const newInstructor = new Instructor ({
            name, email, password
        })

        await newInstructor.save()

        return {
            instructorId: newInstructor._id
        }
    } catch (err) {
        throw err
    }
}