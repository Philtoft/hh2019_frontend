import React, { Component } from "react";
import "./PainTypeView.scss";
import step2 from './img/step2.png';
import cramp from "./img/cramp_no_bg.gif";
import fire from "./img/fire.gif";
import pins from "./img/pins.gif";
import doctor from "./img/doctor.png"

export default class PainTypeView extends Component {
  painClick = (e) => {
    // remove existing active values
    let list = document.getElementsByClassName('active');
    for (let element of list) {
      element.classList.remove("active");
    }

    console.dir(e.target);

    //  sets current gender as active
    if (e.target.classList.contains("pain-button")) {
      e.target.classList.add("active");
    } else if (e.target.classList.contains("img") || e.target.tagName === "P") {
      e.target.parentElement.classList.add("active");
    }
    //e.target.classList.add("active");

    let pain = document.getElementsByClassName("symptoms-container")[0];
    pain.style.display = "flex";
  }

  render() {
    return (
      <div className="column">
        <header className="column-header">
          <img src={step2} alt />
        </header>
        <div className="content">
          <img src={doctor} id="doctor" alt />
          <p className="message">How does your pain feel like?</p>
          <div className="pain-buttons">
            <div className="pain-button" onClick={this.painClick}>
              <div className="img">
                <img src={cramp} alt />
              </div>
              <p>Cramping pain</p>
            </div>
            <div className="pain-button" onClick={this.painClick}>
              <div className="img">
                <img src={fire} alt />
              </div>
              <p>Burning pain</p>
            </div>
            <div className="pain-button" onClick={this.painClick}>
              <div className="img">
                <img src={pins} alt />
              </div>
              <p>Stinging pain</p>
            </div>
          </div>
          <div className="symptoms-container">
            <span className="dashed-line" />
            <p className="g left marginBottom">If you have some additional symptoms, please mark them here</p>
            <input id="diarehea" className="checkbox" type="checkbox" />
            <label htmlFor="diarehea">Diarrhea</label>
            <input id="fullness" className="checkbox" type="checkbox" />
            <label htmlFor="fullness">Fullness</label>
            <input id="bloating" className="checkbox" type="checkbox" />
            <label htmlFor="bloating">Bloating</label>
            <input id="nausea" className="checkbox" type="checkbox" />
            <label htmlFor="nausea">Nausea</label>
            <input id="constipation" className="checkbox" type="checkbox" />
            <label htmlFor="constipation">Constipation</label>
          </div>
        </div>
      </div>

    );
  }
}
