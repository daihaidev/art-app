import React, { useState, useEffect, useRef } from 'react';
import { Collapse, Nav, Navbar, NavItem, NavLink, NavbarBrand, NavbarToggler } from 'reactstrap';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-scroll';

import Logo from '../../../assets/images/logo-light.png';

const MenuButton = ({ isOpen }) => (
  <div className="menu-extras">
    <div className="menu-item">
      <NavLink className={isOpen ? "navbar-toggle open" : "navbar-toggle"} >
        <div className="lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </NavLink>
    </div>
  </div>
);

const Header = () => {
  const shouldCollapse = useMediaQuery({
    query: '(min-device-width: 1280px)'
  });
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const toggle = () => setIsOpen(!isOpen);

  const header = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    checkLoggedInUser();
  }

  const checkLoggedInUser = () => {
    const loggedInUser = localStorage.getItem('userProfile');
    console.log(loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      setUser(null);
    }
  }


  useEffect(() => {
    const HeaderHeight = 120;

    window.addEventListener('scroll', () => {
      if (header.current && document.documentElement.scrollTop > HeaderHeight) {
        header.current.classList.add('scrolled');
      } else if (header.current) {
        header.current.classList.remove('scrolled');
      }
    });

    checkLoggedInUser();


    return () => {
      window.removeEventListener('scroll', () => {
        if (header.current && document.documentElement.scrollTop > HeaderHeight) {
          header.current.classList.add('scrolled');
        } else if (header.current) {
          header.current.classList.remove('scrolled');
        }
      });
    };
  });

  return (
    <header className='header'>
      <div ref={header} className='header-wrapper'>
        <Navbar expand="xl" className="">
          <a href="/" className="m-0 p-0">
            <span className='logo'>
              <img src={Logo} alt="DiggArt" />
            </span>
          </a>

          <NavbarToggler className="order-md-12 order-sm-12 order-xs-12 order-lg-12 order-12 m-0 p-0" onClick={toggle}><MenuButton isOpen={isOpen} /></NavbarToggler>

          <Collapse isOpen={isOpen} navbar className="m-auto">
            <Nav navbar justified className='navbar header-nav d-flex align-items-center m-auto' style={{width:"80%"}}>
              <NavItem className="mNavItem">
                <Link to={'my_new_diggiart'}
                  spy={true}
                  smooth={true}
                  offset={shouldCollapse ? -80 : -120}
                  onClick={toggle}
                  duration={500}>DiggiArt</Link>
              </NavItem>
              <NavItem>
                <Link to={'fungerar'}
                  spy={true}
                  smooth={true}
                  offset={shouldCollapse ? -100 : -140}
                  onClick={toggle}
                  duration={500}>Fungerar så här</Link>
              </NavItem>
              <NavItem>
                <Link to={'pris'}
                  spy={true}
                  smooth={true}
                  offset={shouldCollapse ? -100 : -120}
                  onClick={toggle}
                  duration={500}>Pris</Link>
              </NavItem>
              <NavItem>
                <Link to={'footer'}
                  spy={true}
                  smooth={true}
                  onClick={toggle}
                  duration={500}>Support</Link>
              </NavItem>

              {user !== null ?

                <NavItem className="dropdown">
                  <a
                    className="dropdown-toggle"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Mitt konto</a>

                  <div className="dropdown-menu mb-3" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item pl-4"
                      onClick={handleLogout}>
                      Logga ut </a>
                  </div>
                </NavItem>
                :

                <NavItem>
                  <NavLink className='' href="/login">Logga In/Skapa konto</NavLink>
                </NavItem>
              }

            </Nav>
          </Collapse>

            <div className="dropdown dropdown-mint m-auto">
              <a
                className="btn--green dropdown-toggle"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Börja måla
             </a>

              <div className="dropdown-menu mt-2" aria-labelledby="dropdownMenuLink">
                <a
                  className="dropdown-item"
                  href="/kidsdrawing">Upp till 5 år</a>
                <a
                  className="dropdown-item"
                  href="/professionaldrawing">Från 6 år</a>
              </div>
            </div>


        </Navbar>
      </div>
    </header>
  );
};

export default Header;
