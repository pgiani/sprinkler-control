import React, { Fragment } from "react";

const Zone = props => {
  const { percentage } = props;
  return (
    <Fragment>
      <nav className="site-header sticky-top py-1">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div className="py-2 d-none d-md-inline-block"> Devices </div>
        </div>
      </nav>
      <div className="row t30">
        <div className="col-lg-12">
          <h1 className="text-center t30 pushText">
            Communicating with your devices...
          </h1>
        </div>
      </div>
      <div className="container marketing t30">
        <div className="row">
          <div className="col-lg-4"> </div>
          <div className="col-lg-4">
            <div className="wrap">
              <div className="drop-outer">
                <svg
                  className="drop"
                  viewBox="0 0 40 40"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="20" />
                </svg>
              </div>
              <div className="ripple ripple-1">
                <svg
                  className="ripple-svg"
                  viewBox="0 0 60 60"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="30" cy="30" r="24" />
                </svg>
              </div>
              <div className="ripple ripple-2">
                <svg
                  className="ripple-svg"
                  viewBox="0 0 60 60"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="30" cy="30" r="24" />
                </svg>
              </div>
              <div className="ripple ripple-3">
                <svg
                  className="ripple-svg"
                  viewBox="0 0 60 60"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="30" cy="30" r="24" />
                </svg>
              </div>
            </div>
          </div>
          <div className="col-lg-4"> </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Zone;
