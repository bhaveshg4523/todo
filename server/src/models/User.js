// Importing the mongoose library for MongoDB object modeling
import mongoose from 'mongoose';

// Defining a schema for the User model using the mongoose.Schema method
const userSchema = mongoose.Schema({
    // Defining a field for storing the user's name
    name: {
        type: String, // The type is String
    },
    // Defining a field for storing the user's username
    username: {
        type: String, // The type is String
        min: 6, // Minimum length of 6 characters
        max: 32, // Maximum length of 32 characters
        required: true, // This field is required
    },
    // Defining a field for storing the user's password
    password: {
        type: String, // The type is String
        min: 6, // Minimum length of 6 characters
        max: 32, // Maximum length of 32 characters
        required: true, // This field is required
    },
    // Defining a field for storing the user's email address
    email: {
        type: String, // The type is String
        min: 6, // Minimum length of 6 characters
        max: 32, // Maximum length of 32 characters
        required: true, // This field is required
    },
    // Defining a field for storing an array of todo IDs associated with the user
    todos: [{
        type: mongoose.Schema.Types.ObjectId, // The type is ObjectId
        ref: 'Todo' // The reference to the Todo model
    }],
    // Defining a field for storing the creation date of the user
    date: {
        type: Date, // The type is Date
        default: Date.now // The default value is the current date and time
    }
});

// Creating and exporting the User model using the defined schema
export default mongoose.model("User", userSchema);
