import React, { Fragment } from 'react';
import BackRound from './Backround';

const Zone = props => {
  // TODO get the error message
  // we need to wait until the API trows an error to see if we
  // can use the message here
  const { error } = props;
  return (
    <Fragment>
      <BackRound />
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-bg">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1>oops!</h1>
          <h2>Something went wrong, try again later</h2>
          <a href="#" onCLick={() => window.location.reload(true)}>
            Reload Page{' '}
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Zone;
