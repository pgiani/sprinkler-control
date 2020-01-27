import React from 'react';
import { Link } from 'react-router-dom';

const NavigationOld = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/sample">Sample</Link>
      </li>
    </ul>
  </div>
);

const Navigation = () => (
  <nav className="site-header sticky-top py-1">
    <div className="container d-flex flex-column flex-md-row justify-content-between">
      <Link to="/" className="py-2 d-none d-md-inline-block">
        Devices
      </Link>
    </div>
  </nav>
);
export default Navigation;
