import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/app.css';
import desktopImage from './assets/img/background.jpg';
import mobileImage from './assets/img/background_mobile.png';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = windowWidth >= 650 ? desktopImage : mobileImage;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <div className="App" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="App-content">
        <h1>Pineapples</h1>
        <p>2 They are good</p>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
