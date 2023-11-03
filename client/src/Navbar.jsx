import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-header">
      <div>
        <h3>Blog App</h3>
      </div>
      <div>
        <a href="" className="link">
          Home
        </a>
        <a href="" className="link">
          Create
        </a>
        <a href="" className="link">
          Contact
        </a>
      </div>
      <div>
        <h5>
          <Link to="/register" className="link">
            Register/Login
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default Navbar;
