import React, { Fragment, useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Navigation from "./components/Navigation";
import Home from "./routes/Home";
import About from "./routes/About";
import Sample from "./routes/Sample";

import desktopImage from "./assets/images/background.jpg";
import mobileImage from "./assets/images/background_mobile.png";

export const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = windowWidth >= 650 ? desktopImage : mobileImage;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  console.log(imageUrl);
  return (
    <Fragment>
      <div className="bg">
        <img src={imageUrl} alt="" />
        <Router history={createBrowserHistory()}>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/sample" component={Sample} />
          </Switch>
        </Router>
      </div>
    </Fragment>
  );
};
