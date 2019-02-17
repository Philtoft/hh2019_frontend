import React, { Component } from "react";
import "./WelcomePage.scss";
import logo from './img/logo.png';
import phone from './img/phone-frame.svg';
import doctor from './img/doctor.png';
import arrow from './img/arrow.svg';
import mouse from './img/mouse.png';
import camera from './img/camera.png';

export default class WelcomePage extends Component {

  render() {
    return (
      <div idName='welcome'>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <link rel="stylesheet" href="index.css" />
        <div className="container">
          <header>
            <div id="logo">
              <img src={logo} alt />
            </div>
          </header>
          <div className="round-container">
            <div className="left-content">
              <h1>Understand abdomenal pain symptoms</h1>
              <p>Tool to help you identify your symptoms, 100% anonymously.</p>
            </div>
            <div className="right-content">
              <img src={phone} alt />
              <img id="doctor" src={doctor} alt />
              <p className="g">Hi I'm Anna and I can help you to better understand and describe your pain. </p>
              <button id="start-button">Start symptoms assesment</button>
              <img src={arrow} id="arrow" alt />
            </div>
          </div>
          <div className="options">
            <a onClick={this.props.clickMouse} href="#" className="option">
              <img src={mouse} alt />
              <p>With mouse</p>
            </a>
            <a onClick={this.props.clickCamera} href="#" className="option">
              <img src={camera} alt />
              <p>With camera</p>
            </a>
            <p className="g">Please select the tool you want to proceed with</p>
          </div>
        </div>
      </div>
    );
  }
}
