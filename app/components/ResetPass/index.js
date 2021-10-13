// React Basic and Bootstrap
import { AvField, AvForm } from 'availity-reactstrap-validation';
// Import Icons
import FeatherIcon from 'feather-icons-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import images
import '../../assets/css/digiart.css';
import '../../assets/css/style.css';
import logo from '../../assets/images/logo-light.png';
import girl_house from '../../assets/images/girl_house.jpg';
import request from '../../utils/request';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      isValidEmail: true,
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.setState({ user: foundUser });
    }
  }

  onChangeUsername(e) {
    console.log(e.target.value);
    this.setState({
      username: e.target.value,
    });
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    if (!this.validateEmail(this.state.email)) {
      toast.error('Email Is not Valid');
      this.setState({
        loading: false,
      });
      return;
    }
    const user = {
      username: this.state.username,
      email: this.state.email,
    };

    const { email } = this.state;
    console.log(email);
    request
      .postPublic('users/sendforgetPasswordEmail', { email })
      .then(response => {
        const { msg } = response.data;
        this.setState({
          loading: false,
        });
        toast.success(msg);
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        toast.error(error.response.data.msg);
      });

    this.setState({
      username: '',
      email: '',
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="back-to-home rounded d-none d-sm-block">
          <Link to="/" className="btn btn-icon btn-soft-primary">
            <i>
              <FeatherIcon icon="x" className="icons" />
            </i>
          </Link>
        </div>

        <section className="cover-user bg-white">
          <Container fluid className="px-0">
            <Row className="no-gutters position-relative">
              <Col lg={6} xs={{ order: 2 }} className="cover-my-30">
                <div className="cover-user-img d-flex align-items-center">
                  <Row>
                    <Col xs={12}>
                      <Card
                        className="login_page border-0"
                        style={{ zIndex: 1 }}
                      >
                        <CardBody className="p-0">
                          <h4 className="card-title text-center">
                            Glömt ditt lösenord
                          </h4>
                          <AvForm
                            onSubmit={this.onSubmit}
                            className="login-form mt-4"
                          >
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="position-relative">
                                  <Label>
                                    E-postadress{' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <i>
                                    <FeatherIcon
                                      icon="user"
                                      className="fea icon-sm icons"
                                    />
                                  </i>
                                  <AvField
                                    type="email"
                                    className="form-control pl-5"
                                    onChange={this.onChangeEmail}
                                    errorMessage="Ogiltig e-postadress"
                                    validate={{
                                      required: { value: true },
                                      email: { value: true },
                                    }}
                                    placeholder="Email"
                                    name="E-postadress"
                                  />
                                </FormGroup>
                              </Col>
                              <Col
                                lg={12}
                                className="d-flex justify-content-center text-center mb-0"
                              >
                                {!this.state.loading ? (
                                  <Button
                                    style={{ width: 'auto' }}
                                    className="btn-rounded"
                                    color="success"
                                    block
                                  >
                                    Återställ lösenord
                                  </Button>
                                ) : (
                                  <Button
                                    type="submit"
                                    style={{ width: 'auto' }}
                                    className="btn-rounded disabled"
                                    color="success"
                                    block
                                  >
                                    <span style={{ color: '#fff' }}>
                                      <i className="fa fa-spinner" />
                                    </span>{' '}
                                    Loading...
                                  </Button>
                                )}
                              </Col>
                              <Col xs={12} className="text-center">
                                <p className="mb-0 mt-3">
                                  <small className="text-dark mr-2">
                                    Har du inget konto?
                                  </small>{' '}
                                  <Link
                                    to="/register"
                                    className="text-primary font-weight-bold"
                                  >
                                    Skapa konto
                                  </Link>
                                </p>
                              </Col>
                            </Row>
                          </AvForm>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col
                id="hide-on-mobile"
                lg={{ size: 6, offset: 6 }}
                xs={{ order: 1 }}
                className="padding-less img my-small-img"
                style={{ backgroundImage: `url(${girl_house})` }}
              >
                <Link to="/">
                  <img src={logo} className="logo-auth" alt="Diggiart" />
                </Link>
              </Col>{' '}
            </Row>

            <ToastContainer />
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
