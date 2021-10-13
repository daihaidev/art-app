import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Banner from './components/Banner';
import StartPaint from './components/StartPaint';
import Process from './components/Process';
import CookieConsent from 'react-cookie-consent';
import { Col, Container, Row } from 'reactstrap';


const Index = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <StartPaint />
      <Process />
      <Footer />
      <Container fluid className="cookies-bar">
        <Row>
          <Col md="12" id="yangu">
            <CookieConsent
              id="cookie"
              className="cookie"
              location="bottom"
              buttonText="X"
              cookieName="myAwesomeCookieName2"
              style={{ background: 'rgba(68,68,68,.8)' }}
              buttonStyle={{
                display: 'inline-block',
                background: 'rgba(0,0,0,0)',
                color: '#fff',
                fontSize: '18px',
              }}
              expires={150}
            > DiggiArt använder cookies för att förbättra din upplevelse.
              Vi använder dessa för analysändamål. Genom att fortsätta använda
                vår webbplats godkänner du vår{' '}
              <a className="cookie-a" target="_blank" href="/cookie-consent">
                användning av cookies
                </a>{' '}
            </CookieConsent>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Index;
