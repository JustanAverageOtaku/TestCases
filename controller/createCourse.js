const Course = require('../models/course.model.js')

module.exports = async function createCourse(code, name, instructor, mapping) 
{
    try {
        const existingCourse = await Course.findOne({code: code})
        const allowedPrefixes = ["SE", "CS", "EE", "MATH"]

        if (existingCourse) throw new Error(`Identity theft is a crime, even for a course`)

        const contains = allowedPrefixes.some(element => {
            if(code.substring(0, code.indexOf('-')) === element) {
                return true
            }

            return false
        })

        if (!contains) throw new Error('Now that be a face that even a mother would want to forget')

        if (instructor.substring(instructor.indexOf('@')+1) !== "mail.com") throw new Error('Tsk Tsk, I see thou hast no sense of solidarity to thine blood')

        const newCourse = new Course ({
            code, name, instructor, mapping
        })

        await newCourse.save()

        return {
            courseId: newCourse._id
        }
    } catch (err) {
        throw err
    }
}