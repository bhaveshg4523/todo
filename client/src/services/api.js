import axios from 'axios';
import { LOGIN, REGISTER, CREATE_TODO, TODO_LIST, DELETE_TODO, MARK_TODO } from './apiConstants';

/**
 * Function to authenticate user login by sending a POST request to the login endpoint.
 * @param {Object} data - User login credentials.
 * @returns {Promise} - Axios promise for the login request.
 */
export const login = async (data) => {
    return axios.post(LOGIN, data);
}

/**
 * Function to register a new user by sending a POST request to the register endpoint.
 * @param {Object} data - New user registration data.
 * @returns {Promise} - Axios promise for the registration request.
 */
export const register = async (data) => {
    return axios.post(REGISTER, data);
}

/**
 * Function to create a new todo by sending a POST request to the createTodo endpoint.
 * @param {Object} data - New todo data.
 * @returns {Promise} - Axios promise for the create todo request.
 */
export const createTodoApi = async (data) => {
    let token = getToken();
    return axios.post(CREATE_TODO, data, {
        headers: {
            "auth": token
        }
    });
}

/**
 * Function to get the list of todos by sending a GET request to the todoList endpoint.
 * @param {Object} data - Additional request data (optional).
 * @returns {Promise} - Axios promise for the get todo list request.
 */
export const getTodoListApi = async (data) => {
    let token = getToken();
    return axios.get(TODO_LIST, {
        headers: {
            "auth": token
        }
    });
}

/**
 * Function to delete a todo by sending a POST request to the deleteTodo endpoint.
 * @param {Object} data - Todo ID to delete.
 * @returns {Promise} - Axios promise for the delete todo request.
 */
export const deleteTodoApi = async (data) => {
    let token = getToken();
    return axios.post(DELETE_TODO, data, {
        headers: {
            "auth": token
        }
    });
}

/**
 * Function to mark a todo as completed or incomplete by sending a POST request to the markTodo endpoint.
 * @param {Object} data - Todo ID to mark.
 * @returns {Promise} - Axios promise for the mark todo request.
 */
export const markTodoApi = async (data) => {
    let token = getToken();
    return axios.post(MARK_TODO, data, {
        headers: {
            "auth": token
        }
    });
}

/**
 * Function to retrieve the authentication token from local storage.
 * @returns {string|null} - Authentication token or null if not found.
 */
export function getToken() {
    let user = localStorage.getItem('user');
    if (!user) return;
    const userObj = JSON.parse(user);
    return userObj.token;
}
