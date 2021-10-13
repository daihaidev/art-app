import React from 'react';
import { Container, Row, Col, Nav, Navbar, NavItem, NavLink } from 'reactstrap';

const Footer = () => {
  return (
    <footer id='footer'>
      <div className="footer_wrapper">
        <Container className='footer_container'>
          <Row>
            <Col md={4} xs={12} sm={12} className='information'>
              <h2 className='title'>Digitalprint i Österåker AB</h2>
              <ul className=" d-flex flex-column align-items-left">
                <li className='address mt-3'>Stationsgränd 24<br />184 50 Åkersberga</li>
                <li className="desktopversion mt-3">&copy; 2020 DiggiArt.com</li>
              </ul>
            </Col>

            <Col md={4} xs={12} sm={12} className='links'>
              <ul className="m-auto nav d-flex flex-column align-items-left">
                <li><a href='/cookie-consent'>Köpvillkor</a></li>
                <li><a href='/cookie-consent'>Frågor &amp; svar</a></li>
                <li><a href='/om-oss'>Om Oss</a></li>
                <li><a href='/cookie-consent'>Cookies</a></li>
              </ul>
            </Col>

            <Col md={4} xs={12} sm={12} className='contact  d-flex flex-column align-items-left'>
              <h2 className='title'>Kontakta oss</h2>
              <h3 class="p-0 mt-4">EMAIL</h3>
              <span class="p-0 my-2"><a href="mailto:support@diggiart.com">support(at)diggiart.com</a></span>
              <h3 class="p-0 mt-4">TELEFON</h3>
              <span class="p-0 my-2"><a href="tel:+08-540-666-40">08 540 666 40</a></span>
              <span className="mobileversion">&copy; 2020 DiggiArt.com</span>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
