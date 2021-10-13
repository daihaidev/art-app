import React, { Component } from 'react';
// Modal Video 
import ModalVideo from 'react-modal-video';
import { Col, Container, Row } from 'reactstrap';
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import play from "../../assets/images/illustrator/play.svg";
// import images
import services from "../../assets/images/illustrator/services.jpg";



class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
        this.openModal = this.openModal.bind(this)
    }
    openModal() {
        this.setState({ isOpen: true })
    }
    render() {
        return (
            <React.Fragment>
                <Container fluid className="m-0">

                    <section className="m-0  w-100" id="home">
                        <Row className="mt-4">
                            <Col lg={12} md={12}>
                                <Col className=" float-right text-left" lg={7} md={7} style={{ marginTop: "80px" }}>
                                    <div className="title-heading text-left">
                                        <h1 onClick={this.openModal} className="lead mb-3 mr-5" style={{ fontSize: "1.45rem" }}><b>BÄSTA JULKLAPPEN</b> till farmor/farfar och mormor/morfar</h1>
                                        <h1 className="blue-text mr-5" style={{ color: "#227fcd" }}><b>Låt ditt barn få skapa sitt eget konstverk</b></h1>
                                        <img src={play} onClick={this.openModal} style={{ cursor: "pointer", display: "block", margin: "auto" }} ></img>
                                        <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='vIaTf0Nz_4M' onClose={() => this.setState({ isOpen: false })} />
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg={12} md={12} className="m-0 p-0 pt-2 mt-sm-0 pt-sm-0">
                                <img style={{ width: "100%" }} src={services} alt="" />
                            </Col>
                        </Row> </section>
                </Container>

            </React.Fragment>
        );
    }
}

export default Section;