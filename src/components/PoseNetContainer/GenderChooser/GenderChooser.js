import React, { Component } from 'react'
import doctor from "./img/doctor.png";
import step1 from "./img/step1.png";
import man from "./img/man.png";
import woman from "./img/woman.png";
export default class GenderChooser extends Component {

  genderClick = (e) => {
    // remove existing active values
    let list = document.getElementsByClassName('active');
    for (let element of list){
      element.removeAttribute('class');
    }

    //  sets current gender as active
    e.target.className  = "active";
    this.props.genderChooser();

    // 
  }

  render() {
    return (
      <div>
      <header className="column-header">
        <img src={step1} alt />
      </header>
      <div className="content">
        <img src={doctor} id="doctor" alt />
        <p className="message">
          Hi! Please choose your gender
        </p>
        <div className="gender">
          <img src={man} alt className onClick = {this.genderClick}/>
          <img src={woman} alt className onClick = {this.genderClick}/>
        </div>
        
      </div>
    </div>
    )
  }
}
