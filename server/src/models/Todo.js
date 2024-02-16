// Importing the mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Defining a schema for the Todo model using the mongoose.Schema method
const todoSchema = mongoose.Schema({
    // Defining a field for storing the user ID associated with the todo
    userId: {
        type: mongoose.Schema.Types.ObjectId, // The type is ObjectId
        ref: `User`, // The reference to the User model
        required: true, // This field is required
    },
    // Defining a field for storing the description of the todo
    desc: {
        type: String, // The type is String
        required: true, // This field is required
    },
    // Defining a field for storing the completion status of the todo
    isCompleted: {
        type: Boolean, // The type is Boolean
        default: false, // The default value is false
        required: true, // This field is required
    },
    // Defining a field for storing the creation date of the todo
    date: {
        type: Date, // The type is Date
        default: Date.now, // The default value is the current date and time
    }
});

// Creating and exporting the Todo model using the defined schema
export default mongoose.model('Todo', todoSchema);
