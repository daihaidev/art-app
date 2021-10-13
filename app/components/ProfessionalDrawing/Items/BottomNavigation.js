import React, { Component } from 'react';
import brushes from '../assets/images/brushes.svg';
import dtemplates from '../assets/images/dtemplates.svg';
import eraser from '../assets/images/eraser.svg';
import j26934 from '../assets/images/j26934.svg';
import upload from '../assets/images/upload.svg';
import '../index.css';

class BottomNavigation extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="bottom-nav text-center">
          <ul className="bottom-nav-items p-0">
            <li><img src={upload} className="m-icon"></img></li>
            <li><img src={dtemplates} className="m-icon"></img></li>
            <li><img src={eraser} className="m-icon"></img></li>
            <li><img src={brushes} className="m-icon"></img></li>
            <li><img src={j26934} className="m-icon m-icon-paint-mobile"></img></li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default BottomNavigation;
