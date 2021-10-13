/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "reactstrap";
import "../index.css";
import { Link } from 'react-router-dom';
import Slider from 'react-rangeslider'

import { SketchPicker } from 'react-color';
import brushes from '../../../assets/icons/brushes.svg';
import SliderIcon from '../../../assets/icons/slider.svg';
import menu_icon from '../../../assets/icons/menu_icon.svg';
import close_icon from '../../../assets/images/close_icon.svg';
import j26934 from '../../../assets/images/j26934.svg';
import eraser from '../../../assets/images/eraser.svg';
import upload from '../../../assets/icons/upload.svg';
import dtemplates from '../../../assets/icons/dtemplates.svg';

import trash from '../../../assets/images/trash.svg';
import user from '../../../assets/images/profile.png';
import notification from '../../../assets/images/notification.svg';
import help from '../../../assets/images/help.svg';
// import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import request from '../../../utils/request';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.imageRef = null;
  }

  state = {
    icon: menu_icon,
    showColorPicker: false,
    color: '#FF0000',
    showResizeSlider: false
  }

  componentDidMount() {
    document.getElementById('canvas').addEventListener('mousedown', this.closeAllMenus);
  }

  componentDidUnMount() {
    document.getElementById('canvas').remove('mousedown', this.closeAllMenus);
  }

  closeAllMenus = () => {
    this.props.closeAllMenus();
    this.setState({ icon: menu_icon, showResizeSlider: false });
  }


  showMenu = () => {
    this.props.toggleMainMenu();
    this.setState({ icon: this.props.showMainMenu ? menu_icon : close_icon, showResizeSlider: false });
  }

  showToolsMenu = () => {
    this.props.toggleToolsMenu();
    this.setState({ showResizeSlider: false });
  }

  showColorPicker = () => {
    this.closeAllMenus();
    this.setState({
      showColorPicker: true,
      showResizeSlider: false
    });
  }

  hideColorPicker = () => {
    this.setState({
      showColorPicker: false,
      showResizeSlider: false
    });
  }

  toggleColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    });
  }

  toggleResizeSlider = () => {
    this.setState({
      showResizeSlider: !this.state.showResizeSlider
    });
  }

  handleColor = (color) => {
    this.setState({
      color
    });
    this.props.handleColor(color);
    //this.showColorPicker();
    //this.closeAllMenus();
  }

  handleFileUpload = (e) => {
    this.setState({ showResizeSlider: false });
    this.props.fileChange(e);
    this.imageRef.value = null;
    this.closeAllMenus();
  }

  handleClear = () => {
    this.setState({ showResizeSlider: false });
    this.props.handleClear();
  }

  handleEraser = () => {
    this.setState({ showResizeSlider: false });
    this.props.handleEraser();
  }

  toggleImagePicker = () => {
    this.setState({ showResizeSlider: false });
    this.props.toggleImagePicker();
  }

  render() {
    return (
      <React.Fragment>
        <div className="menu-icon">
          <img id="menu-menu-icon" src={this.state.icon} onClick={this.showMenu} className="m-icon"></img>
        </div>
        <div className="sidebar bottom-nav text-center">
          <ul className="top-items bottom-nav-items p-0">
            <li><img src={this.state.icon} onClick={this.showMenu} className="m-icon icn"></img></li>
            <li>
              <div className="mtooltip pro">
                <img src={brushes} onClick={this.showToolsMenu} className="m-icon"></img>
                <span className="mtooltiptext">Verktyg</span>
              </div>
            </li>
            <li>
              <div className="mtooltip pro">

                <span
                  id="dropdownMenuButton"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="img-fluid m-icon"
                  onClick={this.toggleColorPicker}
                  style={{ color: `${this.state.color}`, fontSize: "25px" }}>
                  <i className="fa fa-circle"></i>
                </span>

                <span className="mtooltiptext">Färg</span>
              </div>
            </li>
            <li style={{ position: "relative" }}>
              <div className="mtooltip pro">
                <img className="m-icon" onClick={this.toggleResizeSlider} src={SliderIcon} alt="Brush size slider" />
                <span className="mtooltiptext">Verktygsbredd</span>
              </div>
              {this.state.showResizeSlider && (
                <div
                  // className="LeftSidebar--DotsContainer-list"
                  style={this.state.showResizeSlider ? {
                    left: '4rem',
                    top: '0.3rem',
                    position: 'absolute',
                  } : {}}
                >
                  <div
                    className='mslider'
                    style={{
                      width: '16rem'
                    }}
                  >
                    <Slider
                      min={1}
                      max={100}
                      value={this.props.brushSize}
                      onChange={value => this.props.handleRangeChange(value)}
                    />
                    <div className='value'>{this.props.brushSize}px</div>
                  </div>
                </div>
              )}

            </li>
            <li onClick={this.handleEraser}>
              <div className="mtooltip pro">
                <img src={eraser} className="m-icon"></img>
                <span className="mtooltiptext">Suddgummi</span>
              </div>
            </li>
            <li>
              <div className="mtooltip pro mt-5">
                <img src={dtemplates} className="m-icon" onClick={this.toggleImagePicker}></img>
                <span className="mtooltiptext">Ritmallar</span>
              </div>
            </li>
            <li>
              <div className="mtooltip pro">
                <img src={upload} className="m-icon" onClick={() => this.imageRef.click()}></img>
                <span className="mtooltiptext">Uppladdning</span>
              </div>
            </li>

          </ul>
          <ul className="bottom-items p-0">
            <li>
              <div className="mtooltip pro">
                <img src={trash} className="m-icon icn" onClick={this.handleClear}></img>
                <span className="mtooltiptext">Radera allt</span>
              </div>
            </li>
            <li>
              <a href="/account"><img
                src={
                  localStorage.getItem("accessToken") && request.getProfile().profileImage !== null ?
                    `https://api.diggiart.com/public/users/${request.getProfile().profileImage}`
                    : user
                }
                style={{ borderRadius: '50%' }}
                className="m-icon icn"
              >
              </img></a>
            </li>
            <li><img src={notification} className="m-icon icn"></img></li>
            <li><img src={help} className="m-icon icn"></img></li>
          </ul>
        </div>
        <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef => { this.imageRef = imageRef }} onChange={this.handleFileUpload} />


        {/* Color picker menu */}

        <div className={`color-menu card ${this.state.showColorPicker ? "show" : "hidden"}`} aria-labelledby="dropdownMenuButton" style={{ marginLeft: "45px", marginTop: "-30px" }}>
          <div className=" d-flex justify-content-between pl-3">
            <h3>Färg</h3>
            <img className="img-fluid cross" onClick={this.hideColorPicker} src={require('../../../assets/images/cross.png')} style={{ width: "25px", height: "25px", position: "absolute", right: "10px", top: "15px" }} />
          </div>
          <div className="">
            <SketchPicker
              color={this.state.color}
              onChange={(col) => {
                this.handleColor(col.hex);
              }}
            />
          </div>
        </div>

      </React.Fragment >
    );
  }
}

export default SideBar;
