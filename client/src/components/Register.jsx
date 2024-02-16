import React, { useEffect, useState } from 'react';
import { register } from '../services/api.js'; // Import register function from API service
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import Header from './partials/Header.jsx'; // Import Header component

// React component for the Register page
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // State variable to store validation errors
  const [errors, setErrors] = useState(null);

  const navigation = useNavigate(); // Get navigation function from react-router-dom

  // Effect hook to check if user is already logged in and redirect if true
  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
      return navigation('/')
    }
  },[navigation]);

  // Function to handle changes in form inputs
  const handleInputChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  }

  // Function to handle form submission
  const handleSubmit = async () =>{
    const result = await register(form); // Call register API with form data
    console.log(result);

    // Check the result of the register API call
    if(result.status === 200){
      if(result.data.status === 201){ // If there is a validation error
        setErrors(result.data.data); // Set the errors state with validation errors
        toast(result.data.message); // Display a toast message with the error message
        return;
      }
      if(result.data.status === 200){ // If registration is successful
        localStorage.setItem('user',JSON.stringify(result.data.data)); // Store user data in localStorage
        navigation('/'); // Redirect to home page
        return;
      }
      if(result.data.status === 202){ // If there is a generic error
        toast(result.data.message); // Display a toast message with the error message
        return;
      }
    } else {
      toast('Something went wrong, please try again'); // Display a toast message for any other errors
    }
  }

  // Render the Register form
  return (
    <>
    <Header/> {/* Render the Header component */}
    <div className="row justify-content-center mt-4">
    <ToastContainer /> {/* Render the ToastContainer for displaying toast messages */}
        <div className="col-lg-5 card border-primary mt-4">
          <div className='card-header h4 text-center'>
            Register An Account
          </div>
          <div className='card-body'>
            {/* Form inputs for name, username, email, and password */}
            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Name
              </label>
              <input type="text" 
              name="name"
              onChange={handleInputChange}
              className='form-control' 
              placeholder='Enter Name' />
              {/* Display validation error for name */}
              {
                errors?.name && (<small className="form-text text-danger">
                    {errors.name.msg}
                </small>)
              }
            </div>
            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Username
              </label>
              <input type="text" 
              name="username"
              onChange={handleInputChange}
              className='form-control' 
              placeholder='Enter Username' />
              {/* Display validation error for username */}
              {
                errors?.username && (<small  className="form-text text-danger">
                    {errors.username.msg}
                </small>)
              }
            </div>
            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Email
              </label>
              <input type="text" 
              name='email'
              onChange={handleInputChange}
              className='form-control' 
              placeholder='Enter Email' />
              {/* Display validation error for email */}
              {
                errors?.email && (<small  className="form-text text-danger">
                    {errors.email.msg}
                </small>)
              }
            </div>
            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Password
              </label>
              <input type="password" 
              name='password'
              onChange={handleInputChange}
              className='form-control' 
              placeholder='Enter Password' />
              {/* Display validation error for password */}
              {
                errors?.password && (<small  className="form-text text-danger">
                    {errors.password.msg}
                </small>)
              }
            </div>
            {/* Register button */}
            <div className='row justify-content-md-center form-group mt-4'>
              <button type="button"
              onClick={handleSubmit}
              className='col-sm-6 btn btn-outline-primary center'>
               Register
              </button>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
