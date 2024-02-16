// Define a function named jsonGenerate
export const jsonGenerate = (statuscode, message, data = null) => {
    // Return an object with three properties: 'status', 'message', and 'data'
    return {
        status: statuscode, // Status code of the response
        message: message, // Message associated with the response
        data: data // Optional data associated with the response (defaults to null if not provided)
    };
};
