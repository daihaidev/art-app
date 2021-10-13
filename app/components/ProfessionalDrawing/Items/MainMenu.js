/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import trash from '../../../assets/images/trash.svg';
import user from '../../../assets/images/user.svg';
import save from '../../../assets/images/save.svg';
import color_picker from '../../../assets/images/color_picker.svg';
import logo from '../../../assets/images/logo-light.png';
import add from '../../../assets/images/add.svg';
import { CirclePicker } from 'react-color';
class MainMenuDesktop extends Component {
  constructor() {
    super();
    this.state = {
      showBGColor: false
    };
    this.imageRef = null;
  }

  handleFileUpload = (e) => {
    this.props.fileChange(e);
    this.imageRef.value = null;
    this.hideMainMenu();
  }

  hideMainMenu = () => {
    const toolsMenu = document.getElementById('main_menu');
    toolsMenu.classList.remove('show');
    toolsMenu.classList.add('hidden');
  }

  handleClear = () => {
    this.props.handleClear();
    this.hideMainMenu();
  }

  handleSave = () => {
    this.props.handleSave();
    this.hideMainMenu();
  }

  render() {
    return (
      <React.Fragment>
        <div id="main_menu" className={`navbar toolbar d-flex flex-column justify-content-between ${this.props.showMainMenu ? 'visible' : 'hidden'}`}>
          <ul className="nav flex-column" style={{ width: '100%' }}>
            <li className="nav-item icon-pos form-inline" onClick={() => this.setState({ showBGColor: !this.state.showBGColor })}>
              <a className="nav-link" href="#">Bakgrundsfärg</a>
              <img src={color_picker} className="nav-icon"></img>
            </li>
            {this.state.showBGColor &&
              <li className="nav-item icon-pos form-inline" style={{ maxWidth: '12rem', margin: '5px 0' }}>
                <CirclePicker
                  colors={
                    [
                      '#f9dc00',
                      '#f6a229',
                      '#e9540d',
                      '#c5133d',
                      '#913089',
                    ]
                  }
                  onChange={this.props.onChangeBackgroundColor}
                  circleSpacing={8}
                />
              </li>
            }
            <div className="dropdown-divider"></div>
            <li className="nav-item icon-pos form-inline" onClick={this.handleClear}>
              <a className="nav-link" href="#">Ta bort allt</a>
              <img src={trash} className="nav-icon"></img>
            </li>
            <li className="nav-item icon-pos form-inline" onClick={this.handleClear}>
              <a className="nav-link" href="#">Ny sida</a>
              <img src={add} className="nav-icon"></img>
            </li>
            <div className="dropdown-divider"></div>
            <li className="nav-item icon-pos form-inline" onClick={this.props.getCanvasImage}>
              <a className="nav-link" href="#">Skicka till tryck</a>
            </li>
            <div className="dropdown-divider"></div>
            <li className="nav-item icon-pos form-inline" onClick={this.handleSave}>
              <a className="nav-link" href="#">Spara</a>
              <img src={save} className="nav-icon"></img>
            </li>
            <li className="nav-item icon-pos form-inline" onClick={() => this.imageRef.click()}>
              <a className="nav-link" href="#">Öppna</a>
            </li>
            <li className="nav-item icon-pos form-inline">
              <a className="nav-link" href="/myorders">Mina ordrar</a>
            </li>
            <li className="nav-item icon-pos form-inline">
              <a className="nav-link" href="/account">Mitt konto</a>
              <img src={user} className="nav-icon"></img>
            </li>
            <div className="dropdown-divider"></div>
            <li className="nav-item icon-pos form-inline">
              <a className="nav-link" onClick={this.props.handleChangeLevel}>Byt nivå</a>
            </li>
          </ul>

          <div className="bottom-logo d-flex flex-column align-items-center justify-content-center ">
            <a target="_blank" href="https://www.diggiart.com/"><img className="logo" src={logo}></img></a>
            <span><a className="logo-link" target="_blank" href="https://www.diggiart.com/">Startsida</a></span>
          </div>
        </div>
        <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef => { this.imageRef = imageRef }} onChange={this.handleFileUpload} />
      </React.Fragment>
    );
  }
  // eslint-disable-next-line prettier/prettier
}

export default MainMenuDesktop;
