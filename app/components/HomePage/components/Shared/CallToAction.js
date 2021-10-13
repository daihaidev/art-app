import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import '../../../../assets/css/style2.css';
// Import Images

class CallToAction extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.togglemodal.bind(this);
  }

  state = {
    modal: false,
  };

  togglemodal = () => {
    console.log('modal toggle');
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <React.Fragment>
        <Container
          fluid
          className="m-0 p-4"
          style={{ backgroundColor: '#afdffa' }}
        >
          <Row
            className="d-flex justify-content-center"
            id="call-to-action text-center"
          >
            <Col
              className="d-flex justify-content-around"
              md="10"
              lg="7"
              sm="12"
              style={{ fontSize: '21px' }}
            >
              {' '}
              <b>
                Färglägg och rita på egen hand - på dator, surfplatta eller
                mobil. Få tavlan tryckt på canvasduk (A4 eller A3) - inramning
                och frakt ingår.
              </b>
            </Col>
          </Row>
          <Row
            className="d-flex justify-content-center"
            id="call-to-action text-center"
          >
            <Col md="4" sm="12" className="d-flex justify-content-center mt-3">
              <div
                className="btn btn-outline-primary bojra-btn"
                onClick={this.togglemodal}
              >
                BÖRJA MÅLA
              </div>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.modal} role="dialog" autoFocus centered>
          <ModalHeader toggle={this.togglemodal}>Välj nivå</ModalHeader>
          <ModalBody>
            <div className="bg-white p-3 rounded box-shadow d-flex justify-content-around">
              <a
                href="/kidsdrawing"
                className="btn btn-primary"
                onClick={this.togglemodal}
              >
                {' '}
                3-5 år{' '}
              </a>
              <a
                href="/professionaldrawing"
                className="btn btn-primary"
                onClick={this.togglemodal}
              >
                6 år och äldre
              </a>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CallToAction;
