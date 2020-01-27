import React, { Fragment } from 'react';

import { Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

const RunAllZones = props => {
  return (
    <div className="row">
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <ButtonGroup>
          <DropdownButton
            as={ButtonGroup}
            title={
              <span>
                <i className="fa fa-play r10 "></i>All Zones
              </span>
            }
            id="bg-nested-dropdown"
            onSelect={e => {
              console.log({ e }, 'onSelect');
            }}
          >
            <Dropdown.Item eventKey="5">5 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="10">10 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="15">15 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="20">20 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="30">30 minutes</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
      <div className="col-lg-4"></div>
    </div>
  );
};

export default RunAllZones;
