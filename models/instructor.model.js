const mongoose = require("mongoose");
const Schema = mongoose.Schema

const InstructorSchema = new Schema(
    {
        name: {
            type: String, 
            required: true,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
);

//const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = mongoose.model('Instructor', InstructorSchema);