import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Device = props => {
  const { data = {} } = props;
  const { name, status, id } = data;

  return (
    <div className="col-lg-4">
      <h3>{name}</h3>
      <Link
        to={{
          pathname: "/zone",
          state: { data, name, id }
        }}
      >
        <img
          className="img-responsive"
          src={
            "https://res.cloudinary.com/pablo-giani/image/upload/v1580235798/device_p0ed9i.png"
          }
          alt="Generic placeholder image"
          width="200"
          height="140"
        />

        <p className="t15">
          {status === "ONLINE" ? (
            <Button variant="secondary" size="sm">
              <i className="fa fa-wifi text-success"> </i> View Zones
            </Button>
          ) : (
            <Button variant="warning" size="sm">
              <i className="fa fa-ban   text-danger"></i>
              Troubleshot
            </Button>
          )}
        </p>
      </Link>
    </div>
  );
};

export default Device;
