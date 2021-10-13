/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import yellow_brush from '../../../assets/images/yellow_brush.svg';
import purple_pen from '../../../assets/images/purple_pen.svg';
import blue_brush from '../../../assets/images/blue_brush.svg';
import pink_spray from '../../../assets/images/pink_spray.svg';



class MainMenuDesktop extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="tools_menu" className={`navbar toolbar d-flex flex-column justify-content-between ${this.props.showToolMenu ? 'visible' : 'hidden'}`}>
          <ul className="nav flex-column">
            <li
              className="nav-item"
              onClick={() => this.props.handleToolChange('pencil')}
            >
              <a className="nav-link" href="#" >
                <div className="icon-pos form-inline d-flex justify-content-between">
                  Pensel
                  <img src={yellow_brush} className="nav-icon tool"></img>
                </div>
              </a>
            </li>

            <div className="dropdown-divider"></div>
            <li
              className="nav-item"
              onClick={() => this.props.handleToolChange('pen')}
            >
              <a className="nav-link" href="#">
                <div className="icon-pos form-inline d-flex justify-content-between">
                  Penna
                  <img src={purple_pen} className="nav-icon tool"></img>
                </div>
              </a>
            </li>

            <div className="dropdown-divider"></div>
            <li
              className="nav-item"
              onClick={() => this.props.handleToolChange('brush')}
            >
              <a className="nav-link" href="#">
                <div className="icon-pos form-inline d-flex justify-content-between">
                  Borste
                  <img src={blue_brush} className="nav-icon tool"></img>
                </div>
              </a>
            </li>

            <div className="dropdown-divider"></div>
            <li
              className="nav-item"
              onClick={() => this.props.handleToolChange('spray')}
            >
              <a className="nav-link" href="#">
                <div className="icon-pos form-inline d-flex justify-content-between">
                  Spray
                  <img src={pink_spray} className="nav-icon tool"></img>
                </div>
              </a>
            </li>
            <div className="dropdown-divider"></div>

          </ul>
        </div>
      </React.Fragment >
    );
  }
}

export default MainMenuDesktop;