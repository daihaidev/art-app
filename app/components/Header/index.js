/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-scroll";
import { NavLink } from 'react-router-dom';


const Header = ({ blackhead  }) =>{

const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    //for sticky
    window.addEventListener('scroll', () =>{
      const isTop = window.scrollY < 100;
      if(isTop !== true){
        setSticky(true)
      } else{
        setSticky(false)
      }
    });
  }, []);
  return (
        <>
            <header className={`site-header ${isSticky ? 'sticky' : ''} ${blackhead ? 'bg__black' : ''}`}  id="site-header">
              <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container-fluid">
                  <a className="logo" href="./">
                  <img  src={require('../../assets/images/DiggiArt_png_1.png')} />
                  </a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                    {blackhead ? 
                    
                    <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/"
                    >
                    Home</NavLink>
                    </li> 
                    
                    : 
                    <>
                      <li className="nav-item">
                      <Link
                          className="nav-link"
                          activeClass="active"
                          to="features"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration= {500}
                      >
                      Features</Link>
                      </li>
                      
                    
                      <li className="nav-item">
                      <Link
                          className="nav-link"
                          activeClass="active"
                          to="how_works"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration= {500}
                      >
                      How it works</Link>
                      </li>
                      
                      <li className="nav-item">
                      <Link
                          className="nav-link"
                          activeClass="active"
                          to="download"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration= {500}
                      >
                      Download</Link>
                      </li>
                      <li className="nav-item">
                      <Link
                          className="nav-link"
                          activeClass="active"
                          to="testimonials"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration= {500}
                      >
                      Testimonials</Link>
                      </li>
                      <li className="nav-item">
                      <Link
                          className="nav-link"
                          activeClass="active"
                          to="faqs"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration= {500}
                      >
                      FAQ's</Link>
                      </li>
                      <li className="nav-item">
                      <Link
                          className="nav-link"
                          activeClass="active"
                          to="support"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration= {500}
                      >
                      Support</Link>
                      </li>
                      </>
                      }
                    
                      <li className="nav-item btn-order ">
                        <NavLink className="nav-link " to="/signup">Join Us</NavLink>
                      </li>
                    
                    </ul>
                  </div>
                </div>
              </nav>
            </header>
            
        </>
  )
}
export default Header;