import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Container, Row } from 'reactstrap';
import '../index.css';
import menu_icon from '../assets/images/menu_icon.svg';
import close_icon from '../assets/images/close_icon.svg';

class MenuIcon extends Component {
  constructor(props) {
    super(props);
    // this.showMenu = this.showMenu.bind(this);
  }

  state = {
    icon: menu_icon,
    padding: false,
  };

  showMenu() {
    if (document.getElementById('main_menu').classList.contains('hidden')) {
      document.getElementById('main_menu').classList.add('show');
      document.getElementById('main_menu').classList.remove('hidden');
      this.setState({ icon: close_icon });
    } else {
      document.getElementById('main_menu').classList.add('hidden');
      document.getElementById('main_menu').classList.remove('show');
      this.setState({ icon: menu_icon });
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className="menu-icon">
                    <img id="menu-menu-icon" src={this.state.icon} onClick={this.showMenu} className="m-icon"></img>
                </div> */}
      </React.Fragment>
    );
  }
}

export default MenuIcon;
