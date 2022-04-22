
const createCourse = require('../controller/createCourse')
const Course = require('../models/course.model')
const db = require('./db')

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())


describe('Course Added when', () => {

    it('All Conditions for adding course met', async () => {
        const { courseId } = await createCourse("SE-3112", "The Dawn Of Computers", "sg@mail.com", [{"CLO1":["PLO1", "PLO2"]}])
        
        const course = await Course.findById(courseId)

        expect(course.code).toEqual("SE-3112")
        expect(course.name).toEqual("The Dawn Of Computers")
        expect(course.instructor).toEqual("sg@mail.com")
    
    })

})

describe('Errors thrown when', () => {
    
    it('Incorrect entry for Instructor', async () => {
        
        await expect(
            createCourse("SE-3112", "The Dawn Of Computers", "SpitefulGoat", [{"CLO1":["PLO1", "PLO2"]}])
        ).rejects.toThrow()

    })

    it('Incorrect Entry for Code', async () => {
        await expect(
            createCourse("SEZ-3112", "The Dawn Of Computers", "sg@mail.com", [{"CLO1":["PLO1", "PLO2"]}])
        ).rejects.toThrow()

    })
})