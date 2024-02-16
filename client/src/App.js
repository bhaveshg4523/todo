// Import necessary components and functions from React and react-router-dom
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Define the App component
function App() {
  // Retrieve user information from local storage and initialize the user state
  const info = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(info)); // Parse the user info from JSON format

  // Render the component tree with routing using BrowserRouter, Routes, and Route
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route for the Home component */}
          <Route path='/' element={<Home />} />
          {/* Route for the Register component */}
          <Route path='/register' element={<Register />} />
          {/* Route for the Login component, passing user state and setUser function as props */}
          <Route path='/login' element={<Login user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// Export the App component
export default App;
