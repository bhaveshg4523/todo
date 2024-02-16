import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);

  // Effect to check if user is logged in
  useEffect(() => {
    // Check if user data exists in localStorage
    const u = localStorage.getItem("user");
    // Set the user state based on the retrieved data
    setUser(u);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.clear();
    // Redirect to the login page
    navigation("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Link to home page */}
        <Link className="navbar-brand" to="/">
          Todo app
        </Link>
        {/* Navbar toggler button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor04"
          aria-controls="navbarColor04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarColor04">
          <ul className="navbar-nav me-auto">
            {/* Home link */}
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            {/* Login link */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            {/* Register link */}
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            {/* Logout link (visible only if user is logged in) */}
            {user && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={handleLogout}
                  href="#"
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
          {/* Search form */}
          <form className="d-flex">
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
