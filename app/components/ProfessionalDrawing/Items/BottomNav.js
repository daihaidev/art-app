/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { SketchPicker } from "react-color";
import Slider from 'react-rangeslider'
import brushes from '../../../assets/images/brushes.svg';
import close_icon from '../../../assets/images/close_icon.svg';
import dtemplates from '../../../assets/images/dtemplates.svg';
import SliderIcon from '../../../assets/icons/slider.svg';
import eraser from '../../../assets/images/eraser.svg';
import j26934 from '../../../assets/images/j26934.svg';
import menu_icon from '../../../assets/images/menu_icon.svg';
import upload from '../../../assets/images/upload.svg';
import "../index.css";


class BottomNav extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    icon: menu_icon,
    showColorPicker: false,
    toolsMenu: "",
    showResizeSlider: false
  }

  componentDidMount = () => {
    document.getElementById('canvas').addEventListener('mousedown', this.closeAllMenus);
    document.getElementById('menu-menu-icon').addEventListener('click', this.hideToolsMenu);
    document.getElementById('canvas').addEventListener('touchstart', this.closeAllMenus);
  }

  componentDidUnMount = () => {
    document.getElementById('canvas').remove('mousedown', this.closeAllMenus);
    document.getElementById('menu-menu-icon').remove('click', this.closeAllMenus);
    document.getElementById('canvas').remove('touchstart', this.closeAllMenus);
  }

  closeAllMenus = () => {
    this.props.closeAllMenus();
    this.setState({ icon: menu_icon, showResizeSlider: false });
  }


  hideToolsMenu = () => {
    this.state.toolsMenu.classList.add('hidden');
    this.state.toolsMenu.classList.remove('show');
  }

  showToolsMenu = () => {
    this.props.toggleToolsMenu();
    this.setState({ showResizeSlider: false });
  }

  showMenu = () => {
    this.props.toggleMainMenu();
    this.setState({ icon: this.props.showMainMenu ? menu_icon : close_icon, showResizeSlider: false });
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
    this.showColorPicker();
    this.closeAllMenus();
  }

  showColorPicker = () => {
    this.closeAllMenus();
    this.setState({
      showColorPicker: !this.state.showColorPicker
    });
  }

  handleFileUpload = (e) => {
    this.setState({ showResizeSlider: false });
    this.props.fileChange(e);
    this.imageRef.value = null;
    this.closeAllMenus();
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
        <div className="bottom-nav text-center">
          <ul className="bottom-nav-items p-0">
            <li><img src={brushes} onClick={this.showToolsMenu} className="m-icon"></img></li>
            <li>
              <img
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                src={j26934}
                className="m-icon"
              />
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ marginTop: "-23.5rem" }}>
                <div className="dropmenu d-flex justify-content-between pl-3">
                  <h3>Colors</h3>
                  <img className="img-fluid cross" src={require('../../../assets/images/cross.png')} style={{ width: "25px", height: "25px", position: "absolute", right: "10px", top: "15px" }} />
                </div>
                <div className="dropmenu">
                  <div className="eachmenu">
                    {/* <Link> */}
                    <SketchPicker
                      color={this.state.color}
                      onChange={(col) => {
                        this.handleColor(col.hex);
                      }}
                    />
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </li>
            <li style={{ position: "relative" }}>
              <img className="m-icon" onClick={this.toggleResizeSlider} src={SliderIcon} alt="Brush size slider" />
              {this.state.showResizeSlider && (
                <div
                  // className="LeftSidebar--DotsContainer-list"
                  style={this.state.showResizeSlider ? {
                    left: '-5rem',
                    bottom: '1.7rem',
                    position: 'absolute',
                  } : {}}
                >
                  <div
                    className='mslider'
                    style={{
                      width: '15rem'
                    }}
                  >
                    <Slider
                      min={0}
                      max={100}
                      value={this.props.brushSize}
                      onChange={value => this.props.handleRangeChange(value)}
                    />
                    {/* <div className='value'>{this.props.brushSize}px</div> */}
                  </div>
                </div>
              )}
            </li>
            <li><img src={eraser} onClick={this.handleEraser} className="m-icon"></img></li>
            <li><img src={dtemplates} onClick={this.toggleImagePicker} id="upload" className="m-icon"></img></li>
            <li><img src={upload} onClick={() => this.imageRef.click()} className="m-icon"></img></li>
          </ul>
        </div>
        <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef => { this.imageRef = imageRef }} onChange={this.handleFileUpload} />

      </React.Fragment>
    );
  }
}

export default BottomNav;
