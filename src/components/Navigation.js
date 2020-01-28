import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = props => {
  const { data = {} } = props;
  const { fullName } = data;

  return (
    <nav className="site-header sticky-top py-1">
      <div className="container d-flex flex-column flex-md-row justify-content-between">
        <Link to="/devices" className="py-2 d-none d-md-inline-block">
          Devices
        </Link>
        {fullName && (
          <div className="py-2 d-none d-md-inline-block">{fullName}</div>
        )}{' '}
      </div>
    </nav>
  );
};
export default Navigation;
