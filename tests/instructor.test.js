
const createInstructor = require('../controller/createInstructor')
const Instructor = require('../models/instructor.model')
const db = require('./db')

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())


describe('instructor created when', () => {

    it('Instructor Added', async () => {
        const { instructorId } = await createInstructor("Lobier", "lob@mail.com", "loblob")

        const instructor = await Instructor.findById(instructorId)

        expect(instructor.name).toEqual("Lobier")
        expect(instructor.email).toEqual("lob@mail.com")
        expect(instructor.password).toEqual("loblob")
        
    })

})

describe('Errors thrown when', () => {

    it('Name Repeated', async () => {
        await createInstructor("Lobier", "lob@mail.com", "loblob")
        
        await expect(
            createInstructor("Lobyn", "lob@mail.com", "loby")
        ).rejects.toThrow()

    })

    it('Invalid Credentials', async () => {

        await expect(
            createInstructor("Lobyn", "lob@gmail.com", "loby")
        ).rejects.toThrow()
        
    })

})