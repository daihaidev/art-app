// React Basic and Bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  Media,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';
import { init } from emailjs from 'emailjs-com';

import { ToastContainer, toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

// Import Icons
import FeatherIcon from 'feather-icons-react';
import SectionTitle from './components/Shared/SectionTitle';

init('user_mEriXdE6hWdIS73dslGWt');
class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMail.bind(this);
    this.callNumber.bind(this);
  }

  state = {
    name: "",
    email: "",
    comments: "",
    buttonDisabled: false,
    showMessage: false,
  };

  handleSubmit(event) {
    event.preventDefault();
  }

  handleInputChange(event) {
    event.preventDefault();
    const { target } = event;
    const { name } = target;
    const {value} = target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    // document.getElementById('topnav').classList.add('bg-white');
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById('topnav').classList.add('nav-sticky');
    }
    else {
      document.getElementById('topnav').classList.remove('nav-sticky');
    }
  };

  sendMail() {
    window.location.href = "mailto:support@diggiart.com";
  }

  callNumber() {
    window.location.href = "tel:08 540 666 40";
  }

  sendMessage(event) {
    event.preventDefault();
    toast.info("Skickar meddelande", {
      position: toast.POSITION.BOTTOM_CENTER
    });
    const templateParams = {
      from_name: `${this.state.name  } (${  this.state.email  })`,
      to_name: "support@diggiart.com",
      message: this.state.comments
    };

    emailjs.send("service_am90my9", "template_u88i81d", templateParams)
      .then(
        function (response) {
          console.log("response!", response.status, response.text);
          toast.success("Ditt meddelande har skickats!", {
            position: toast.POSITION.BOTTOM_CENTER
          });
      },
        function (err) {
          console.log("FAIL!", err);
          toast.error("Ditt meddelande kunde inte skickas", {
            position: toast.POSITION.BOTTOM_CENTER
          });
      },
        this.setState({ buttonDisabled: false }),
      );

    this.setState({
      name: "",
      email: "",
      comments: ""
    });
  }

  render() {
    return (
      <React.Fragment>
        <section id="support" className="mb-5 pt-1 mt-1">
          <Container className="mt-100 mt-60">
            <Row className="align-items-center">
              <Col lg={5} md={{ size: 6, order: 1 }} xs={{ order: 2 }} className="mt-4 mt-sm-0 pt-2 pt-sm-0 ">
                <Card className="custom-form rounded shadow border-0">
                  <CardBody>
                    <div id="message"></div>
                    <Form method="post" onSubmit={this.sendMessage.bind(this)} name="contact-form" id="contact-form">
                    >
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="position-relative">
                            <Label>Ditt namn <span className="text-danger">*</span></Label>
                            <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                            <Input name="name" id="name" onChange={this.handleInputChange.bind(this)} type="text" className="form-control pl-5" placeholder="Namn :" required />
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="position-relative">
                            <Label>Ditt E-post <span className="text-danger">*</span></Label>
                            <i><FeatherIcon icon="mail" className="fea icon-sm icons" /></i>
                            <Input name="email" id="email" onChange={this.handleInputChange.bind(this)} type="email" className="form-control pl-5" placeholder="E-post :" required />
                              required
                            />
                            required />
                          </FormGroup>
                        </Col>
                        <Col lg={12}>
                          <FormGroup className="position-relative">
                            <Label>Meddelande</Label>
                            <i><FeatherIcon icon="message-circle" className="fea icon-sm icons" /></i>
                            <textarea name="comments" onChange={this.handleInputChange.bind(this)} id="comments" rows="4" className="form-control pl-5" placeholder="Ditt Meddelande :"></textarea>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12" className="text-center">
                          <input disabled={this.state.buttonDisabled} type="submit" id="submit" name="send" className="submitBnt btn btn-primary btn-block" value="Skicka Meddelande" />
                          <div id="simple-msg"></div>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={7} md={{ size: 6, order: 2 }} xs={{ order: 1 }}>
                <div className="title-heading ml-lg-4">
                  <h4 className="mb-4">Kontakta oss</h4>
                  <p className="text-muted">Kontakta oss på mail eller telefon.</p>
                  <Media className="contact-detail align-items-center mt-3">
                    <div className="icon">
                      <i><FeatherIcon icon="mail" className="fea icon-m-md text-dark mr-3" /></i>
                    </div>
                    <Media body className="content">
                      <h4 className="title font-weight-bold mb-0">Email</h4>
                      <Link to="#" onClick={this.sendMail} className="text-primary ">support@diggiart.com</Link>
                    </Media>
                  </Media>

                  <Media className="contact-detail align-items-center mt-3">
                    <div className="icon">
                      <i><FeatherIcon icon="phone" className="fea icon-m-md text-dark mr-3" /></i>
                    </div>
                    <Media body className="content">
                      <h4 className="title font-weight-bold mb-0">Telefon</h4>
                      <Link to="#" onClick={this.callNumber} className="text-primary ">08 540 666 40</Link>
                    </Media>
                  </Media>
                </Media>
              </Col>
            </Row>
            <ToastContainer />
          </Container>
        </section>
        <section id="#pris">


        </section>
      </React.Fragment>
    );
  }
}
export default Contact;
