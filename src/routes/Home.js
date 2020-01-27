import React, { useState, useEffect } from 'react';

import Zone from '../components/zone';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="container marketing">
      <div className="row">
        <Zone />
        <Zone />
        <Zone />
      </div>
    </div>
  );
};

export default Home;
