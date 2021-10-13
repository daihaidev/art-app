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
  Input,
  Label,
  Row,
} from 'reactstrap';
import '../../assets/css/digiart.css';
// import images
import '../../assets/css/style.css';
import girl_house from '../../assets/images/girl_house.jpg';
import logo from '../../assets/images/logo-light.png';
import request from '../../utils/request';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmedPassword = this.onChangeConfirmedPassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);

    this.state = {
      username: '',
      email: '',
      confirmed_password: '',
      password_error_message: '',
      redirect: '',
      isValidEmail: true,
      loading: false,
      checked: true,
    };
  }

  componentDidMount() {}

  onChangeAction() {
    const mycheck = this.state.checked;
    if (mycheck === true) {
      this.setState({
        checked: false,
      });
    } else {
      this.setState({
        checked: true,
      });
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmedPassword(e) {
    this.setState({
      confirmed_password: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      isValidEmail: false,
      email: e.target.value,
    });
  }

  onSubmit(e) {
    console.log('submit');
    this.setState({
      loading: true,
    });
    e.preventDefault();

    if (!document.getElementById('customCheck1').checked) {
      toast.error('You must accept the terms of service', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      this.setState({
        loading: false,
      });
      return;
    }

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmed_password: this.state.confirmed_password,
    };

    if (user.confirmed_password !== user.password) {
      this.setState({ password_error_message: 'Passwords do not Match!' });
      toast.error('Passwords do not match', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      this.setState({
        loading: false,
      });
      return;
    }
    this.setState({
      password_error_message: '',
    });

    request
      .postPublic('users/register', {
        email: this.state.email,
        password: this.state.password,
        acceptTerms: true,
        name: this.state.username,
        ageLevel: 'default',
      })
      .then(response => {
        console.log('response');
        const { token, user } = response.data;
        request.setToken(token);
        request.setProfile(user);
        // setLoading(false);
        toast.success('Register Successfully!');
        history.push('/kidsdrawing');

        this.setState({
          loading: false,
          redirect: '/professionaldrawing',
        });
      })
      .catch(error => {
        console.log('error');
        // setLoading(false);
        toast.error('User already exists');

        this.setState({
          loading: false,
        });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

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
          <Container fluid className="px-3">
            <Row className="no-gutters position-relative">
              <Col lg={6} xs={{ order: 2 }} className="cover-my-30 ">
                <div className="cover-user-img d-flex align-items-center">
                  <Row>
                    <Col xs={12}>
                      <Card
                        className="login_page border-0"
                        style={{ zIndex: 1 }}
                      >
                        <CardBody className="px-3">
                          <h4 className="card-title text-center">
                            {' '}
                            Skapa konto
                          </h4>
                          <AvForm
                            onSubmit={this.onSubmit}
                            className="login-form mt-4"
                          >
                            <Row>
                              <Col md="12">
                                <FormGroup className="position-relative">
                                  <Label for="firstname">
                                    Namn<span className="text-danger">*</span>
                                  </Label>
                                  <i>
                                    <FeatherIcon
                                      icon="user"
                                      className="fea icon-sm icons"
                                    />
                                  </i>
                                  <AvField
                                    onChange={this.onChangeUsername}
                                    value={this.state.username}
                                    type="text"
                                    className="form-control pl-5"
                                    name="username"
                                    id="username"
                                    placeholder="Namn"
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: 'Ange namn',
                                      },
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup className="position-relative">
                                  <Label for="email">
                                    E-postadress{' '}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <i>
                                    <FeatherIcon
                                      icon="mail"
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

                              <Col md="12">
                                <FormGroup className="position-relative">
                                  <Label for="password">
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
                                    onChange={this.onChangePassword}
                                    value={this.state.password}
                                    type="password"
                                    className="form-control pl-5"
                                    name="password"
                                    id="password"
                                    placeholder="Lösenord"
                                    required
                                    errorMessage={
                                      this.state.password_error_message
                                    }
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage:
                                          'Vänligen skriv in ett lösenord',
                                      },
                                      minLength: {
                                        value: 6,
                                        errorMessage:
                                          'Ditt lösenord måste innehålla mellan 6 och 8 tecken',
                                      },
                                      maxLength: {
                                        value: 16,
                                        errorMessage:
                                          'Ditt lösenord måste innehålla mellan 6 och 8 tecken',
                                      },
                                    }}
                                  />
                                </FormGroup>
                              </Col>

                              <Col md="12">
                                <FormGroup className="position-relative">
                                  <Label for="confirmpassword">
                                    {' '}
                                    Bekräfta lösenordet
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
                                    onChange={this.onChangeConfirmedPassword}
                                    className="form-control pl-5"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    placeholder="Bekräfta lösenordet"
                                    value={this.state.confirmed_password}
                                    required
                                    errorMessage=""
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage:
                                          'Vänligen skriv in ett lösenord',
                                      },
                                      minLength: {
                                        value: 6,
                                        errorMessage:
                                          'Ditt lösenord måste innehålla mellan 6 och 8 tecken',
                                      },
                                      maxLength: {
                                        value: 16,
                                        errorMessage:
                                          'Ditt lösenord måste innehålla mellan 6 och 8 tecken',
                                      },
                                    }}
                                  />
                                </FormGroup>
                              </Col>

                              <Col md="12">
                                <FormGroup>
                                  <div className="custom-control custom-checkbox">
                                    <Input
                                      value="accept"
                                      name="accept"
                                      type="checkbox"
                                      className="custom-control-input"
                                      onChange={this.onChangeAction}
                                      checked={this.state.checked}
                                      id="customCheck1"
                                      validate={{
                                        required: {
                                          value: true,
                                          errorMessage:
                                            'Vänligen skriv in ett lösenord',
                                        },
                                      }}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      for="customCheck1"
                                    >
                                      Genom att fortsätta använda vår webbplats
                                      godkänner du vår användning{' '}
                                      <Link
                                        to="/cookie-consent"
                                        className="text-primary"
                                      >
                                        av cookies och vilkor
                                      </Link>
                                    </Label>
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col
                                lg={12}
                                className="d-flex justify-content-center text-center mb-0"
                              >
                                {!this.state.loading ? (
                                  <Button
                                    type="submit"
                                    style={{ width: 'auto' }}
                                    className="btn-rounded"
                                    color="success"
                                    block
                                  >
                                    {' '}
                                    Skapa konto
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
                              <Col className="mx-auto">
                                <small className="text-dark mt-2 mr-2 mb-0 mt-3">
                                  Har du redan ett konto?{' '}
                                  <Link
                                    to="/login"
                                    className="text-primary font-weight-bold"
                                  >
                                    {' '}
                                    Logga in
                                  </Link>
                                </small>
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
                <Link to="/login">
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
