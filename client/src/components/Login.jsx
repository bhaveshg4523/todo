import React, { useEffect, useState } from 'react';
import { login } from '../services/api.js'; // Import login function from API service
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import Header from './partials/Header.jsx'; // Import Header component

// React component for the Login page
export default function Login({user,setUser}) {
  const navigation = useNavigate(); // Get navigation function from react-router-dom
  const [form, setForm] = useState({
    username:'',
    password:'',
  });

  // State variable to store login error
  const [error, setError] = useState(null);

  // Function to handle changes in form inputs
  const handleChange=(e)=>{
    setForm({...form, [e.target.name]:e.target.value});
  }

  // Effect hook to check if user is already logged in and redirect if true
  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
      return navigation('/');
    }
  },[navigation]);

  // Function to handle form submission
  const handleSubmit= async ()=>{
    const result = await login(form); // Call login API with form data

    // Check the result of the login API call
    if(result.status === 200){
      if(result.data.status === 200){ // If login is successful
        localStorage.setItem('user',JSON.stringify(result.data.data)); // Store user data in localStorage
        navigation("/"); // Redirect to home page
        return;
      }
      if(result.data.status === 201){ // If there is a validation error
        setError(result.data.data); // Set the error state with validation errors
        toast(result.data.message); // Display a toast message with the error message
        return;
      }
      if(result.data.status === 202){ // If there is a generic error
        toast(result.data.message); // Display a toast message with the error message
        return;
      }
    }
  }

  // Render the Login form
  return (
    <>
    <Header/> {/* Render the Header component */}
    <div className="container">
    <ToastContainer /> {/* Render the ToastContainer for displaying toast messages */}
      <div className="row justify-content-center mt-4">
        <div className="col-lg-5 card border-primary mt-4">
            <div className="card-body">
                <h4 className="card-title">Login</h4>
                {/* Input field for username */}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                        Email or Username
                    </label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="username"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email or Username"
                    />
                    {/* Display validation error for username */}
                    {error?.username && <small id="emailHelp" className="form-text text-danger">
                        {error.username.msg}
                    </small>}
                    
                </div>
                {/* Input field for password */}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        className="form-control"
                        id="exampleInputEmail2"
                        aria-describedby="emailHelp"
                        placeholder="Enter Password"
                    />
                    {/* Display validation error for password */}
                    {error?.password && <small id="emailHelp" className="form-text text-danger">
                        {error.password.msg}
                    </small>}
                    
                </div>
                {/* Login button */}
                <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}
