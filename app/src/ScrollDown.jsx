import React from "react";

import "./ScrollDown.scss";

const ScrollDown = () => (
  <div className="outerContainer">
    <div className="innerContainer">
      <div className="chevron"></div>
      <div className="chevron"></div>
      <div className="chevron"></div>
      <span className="text">Scroll down</span>
      <a className="text" href="https://naegele.it">
        See it in action
      </a>
    </div>
  </div>
);

export default ScrollDown;
