// React Basic and Bootstrap
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import bg01 from '../../assets/images/illustrator/social.svg';
import tick from '../../assets/images/illustrator/tick.svg';



class Diggiart extends Component {

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{__html: `
                    ul{
                        list-style:none;
                    }
                    ul li.mine::before {
                        content: url('${tick}');
                      }
                    `}}></style>
                    <section id="diggiart" className="section">
                    <Container>
                        <Row className="align-items-center">
                            <Col md="6">
                                <div className="d-flex justify-content-center d-table-cell align-middle" style={{background: `url(${bg01}) center center`, backgroundSize:"300px 300px", backgroundRepeat:"no-repeat", height:"300px", fontSize:"1.38rem"}}>
                                <b className="mt-5 pt-5">DiggiArt - för barn <br/>
                                <ul>
                                    <li className="mine"> 3-5 år </li>
                                    <li className="mine"> 6 år och äldre</li>
                                    </ul>
                                    </b>
                                </div>
                            </Col>

                            <Col md="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="ml-md-4">
                                <p style={{fontSize:"1.2rem"}}><b> DiggiArt är lika enkelt som roligt för ditt barn</b> att på egen hand
                                    kunna måla en tavla. Antingen helt på fri hand eller i kombination
                                    med färdiga bilder som kan färgläggas. I DiggiArt finns även
                                    möjligheten att ”Ta ett foto” eller ”Ladda upp bild”. <b>En kreativitet
                                    utan gränser för ditt barn</b>. </p>
                                    <p  style={{fontSize:"1.2rem"}}>
                                    <b>Helt säkert är - att det blir en unik tavla</b>. Fin att sätta på väggen i
                                    lekrummet eller varför inte ge bort den i present till någon som står
                                    barnet nära och värderar tavlan högre än en Picasso målning.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    </section>
            </React.Fragment>
        );
    }
}

export default Diggiart;
