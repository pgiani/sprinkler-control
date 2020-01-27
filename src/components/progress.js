import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

const Zone = props => {
  const { percentage } = props;
  return (
    <div className="container marketing">
      <div className="row">
        <div className="col-lg-4"> </div>
        <div className="col-lg-4">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: `rgba(62, 152, 199, ${percentage / 100})`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'round',
                // Customize transition animation
                transition: 'stroke-dashoffset 0.75s ease 0.5s',
                // Rotate the path
                // transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: '#ffffff',
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'flat',
                // Rotate the trail
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
              },
              // Customize the text
              text: {
                // Text color
                fill: '#000000',
                // Text size
                fontSize: '18px',
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: '#3e98c7',
              },
            }}
          />
        </div>
        <div className="col-lg-4"> </div>
      </div>
    </div>
  );
};

export default Zone;
