import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalVideo from 'react-modal-video';
import '../scss/modal-video.scss';

import { ReactComponent as ColorBlue } from '../../../assets/images/vectors/Startsida bilder/Fargdutt ljusbla.svg';
import { ReactComponent as ColorOrange } from '../../../assets/images/vectors/Startsida bilder/Fargdutt orange.svg';
import { ReactComponent as ColorGreen } from '../../../assets/images/vectors/Startsida bilder/Fargdutt morkgron.svg';
import { ReactComponent as ColorRed } from '../../../assets/images/vectors/Startsida bilder/Fargdutt rod.svg';

import { ReactComponent as PlayerIcon } from '../../../assets/images/vectors/Startsida bilder/Play knapp (gron).svg';

const Process = () => {
  const ProcessBox = ({ num, text, Color }) => {
    return (
      <Container className='stage'>
        <div className="stage-img">
          <Color width='100%' height='100%' />
        </div>
        <Row xs={1}>
          <Col><h2>Steg {num}</h2></Col>
          <Col><span>{text}</span></Col>
        </Row>
      </Container>
    );
  };

  const Dots = ({ num }) => (
    <div className='dot_container'>
      {[...Array(num)].map((_, i) => <div key={'dot' + i} className="dot"></div>)}
    </div>
  );
  const [videoModal, setVideoModal] = useState(false);

  const boxData = [
    { color: ColorBlue, text: 'Klicka på ”Börja måla” och välj sedan nivå ”Upp till 5 år” eller ”Från 6 år”. Använd sedan verktygen (penna, pensel, etc) för att börja måla tavlan.' },
    { color: ColorOrange, text: 'När tavlan är färdigmålad klicka på ”Skicka för tryck”. Du kan även välja ”Skapa konto” för att sedan ”Spara bilden” för tryck vid senare tillfälle.' },
    { color: ColorGreen, text: 'Vi trycker tavlan på polycanvasduk samt monterar den i en kilram av nordiskt furu. Efter 2-3 dagar går din beställning med post från oss.' }
  ];

  return ( <>
      <ModalVideo channel='youtube' isOpen={videoModal} videoId='vIaTf0Nz_4M' onClose={() => setVideoModal(!videoModal)} />

      <section id='fungerar'>
        <Container className='section_container'>
          <Row>
            <Col md={12} className='process_title'>
              <h2 className='process_heading'>DiggiArt är anpassat för två olika åldersgrupper av barn – se mer!</h2>
            </Col>
            <Col className='process-separator'>
              <Dots num={18} />
              <PlayerIcon onClick={() => setVideoModal(!videoModal)} width='120px' className='player_icons' />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container className='section_container'>
          <Row>
            <Col>
              <h2 className='process_heading'>DiggiArt - så här fungerar det</h2>
            </Col>
          </Row>
          <Row className='process_wrapper'>
            {boxData.map((data, i) => <Col key={'stage' + i} sm={12} md={4}><ProcessBox num={i + 1} text={data.text} Color={data.color} /></Col>)}
          </Row>

          <Row>
            <Col>
              <span className='process_note'>Du kan även välja att spara målningen för tryck vid ett senare tillfälle. ”Skapa konto” för att spara ditt barns målningar - ditt barns egna tavelgalleri!</span>
            </Col>
          </Row>
        </Container>
      </section>

      <section id='pris'>
        <Container className='section_container'>
          <Row>
            <Col className='process-separator'>
              <Dots num={18} />
            </Col>
          </Row>
          <Row className="d-flex flex-row align-items-center">
            <Col md={10} className='process_description'>
              <h2 className='process_heading'>Tavlan kan beställas i två storlekar – tryckt på polycanvas monterad på kilram:</h2>
              <span className="paper_sizes">Storlek 21x30 cm - kostar 540 kr (inkl. moms)</span>
              <span className="paper_sizes">Storlek 30x42 cm - kostar 720 kr (inkl. moms)</span>
              <h2 className='process_heading'>Kilram i trä och frakt ingår. Leveranstid ca 5 arbetsdagar.</h2>
            </Col>
            <Col md={2} className="m-0 p-0 mt-5">
              <ColorRed className='red_paint' />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Process;
