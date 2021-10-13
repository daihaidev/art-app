// React Basic and Bootstrap
import { AvField, AvForm } from 'availity-reactstrap-validation';
// Import Icons
import FeatherIcon from 'feather-icons-react';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import '../../assets/css/digiart.css';
// import images
import '../../assets/css/style.css';
import girl_house from '../../assets/images/girl_house.jpg';
import logo from '../../assets/images/logo-light.png';
import request from '../../utils/request';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.goBackToLink = this.goBackToLink.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      password: '',
      email: '',
      dbUser: '',
      redirect: '',
      loading: false,
    };
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  goBackToLink() {
    if (localStorage.getItem('backURL')) {
      console.log(`back to: ${localStorage.getItem('backURL')}`);
      window.location.href = localStorage.getItem('backURL');
    } else {
      window.location.href = '/';
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    request
      .postPublic('users/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(response => {
        const { token, user } = response.data;

        request.setToken(token);
        request.setProfile(user);
        toast.success('Login Successfully!');
        this.setState({
          loading: false,
        });

        this.goBackToLink();
      })
      .catch(error => {
        toast.error(error.response.data.msg);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="back-to-home rounded d-none d-sm-block">
          <Link
            to="/"
            id="close-auth"
            className="btn btn-icon btn-soft-primary"
          >
            <i>
              <FeatherIcon icon="x" className="icons" />
            </i>
          </Link>
        </div>

        <section className="cover-user bg-white">
          <Container fluid className="px-3">
            <Row className="no-gutters position-relative">
              <Col lg={6} xs={{ order: 2 }} className="cover-my-30">
                <div className="cover-user-img d-flex align-items-center">
                  <Row>
                    <Col xs={12}>
                      <Card
                        className="login_page border-0"
                        style={{ zIndex: 1 }}
                      >
                        <CardBody className="px-3">
                          <h4 className="card-title text-center">Logga in</h4>
                          <AvForm
                            className="login-form mt-4"
                            onSubmit={this.onSubmit}
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
                                    onChange={this.onChangeEmail}
                                    value={this.state.email}
                                    type="text"
                                    className="form-control pl-5"
                                    name="email"
                                    id="email"
                                    placeholder="Ange din e-postadress"
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: 'Ange din e-postadress',
                                      },
                                      pattern: {
                                        value:
                                          '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
                                        errorMessage: 'Ogiltig e-postadress',
                                      },
                                    }}
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg={12}>
                                <FormGroup className="position-relative">
                                  <Label>
                                    Lösenord{' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <i>
                                    <FeatherIcon
                                      icon="lock"
                                      className="fea icon-sm icons"
                                    />
                                  </i>
                                  <AvField
                                    type="password"
                                    onChange={this.onChangePassword}
                                    className="form-control pl-5"
                                    alue={this.state.password}
                                    name="password"
                                    errorMessage="Skriv in lösenord"
                                    validate={{ required: { value: true } }}
                                    placeholder="Lösenord"
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg={12}>
                                <div className="d-flex justify-content-between">
                                  <p className="forgot-pass mb-3">
                                    {' '}
                                    Glömt ditt lösenord?
                                    <Link
                                      to="/resetPassword"
                                      className="text-primary font-weight-bold"
                                    >
                                      {' '}
                                      Återställa här
                                    </Link>
                                  </p>
                                </div>
                              </Col>
                              <Col
                                lg={12}
                                className="d-flex justify-content-center text-center mb-0"
                              >
                                {!this.state.loading ? (
                                  <Button
                                    style={{ width: 'auto' }}
                                    className="btn-rounded"
                                    type="submit"
                                    color="success"
                                    block
                                  >
                                    {' '}
                                    Logga in
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
              </Col>
            </Row>
            <ToastContainer />
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
