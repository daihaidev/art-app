import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../../../node_modules/react-modal-video/scss/modal-video.scss';



class Pris extends Component {

    render() {
        return (
            <React.Fragment>
                <section id="pris" className="section">
                    <Container fluid className="m-0">
                        <Row className="justify-content-center">
                            <Col md="8">
                                <h1>Pris</h1>
                                <p>Våra tavlor kan du beställa i två storlekar, 21x30cm och 30x42 cm. Kanvas på kilram i storlek 21x30 cm kostar 520kr inklusive moms och frakt, kanvas på kilram i storleken 30x42cm kostar 730 kr inklusive moms och frakt.</p>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default Pris;