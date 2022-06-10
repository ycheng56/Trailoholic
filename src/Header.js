// Components of Navigation Bar
// If not login, the nagivation bar will show signup and login link
// If login, the nagivation bar will show a link to user's profile

import React from "react";
import { Link } from "react-router-dom";

function Header({ login }) {
  return login ? (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/trails">Trails</Link>
      <Link to="/users/testuser/profile">testuser</Link>
    </nav>
  ) : (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/trails">Trails</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
}

export default Header;
