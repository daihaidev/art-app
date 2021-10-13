// Import Icons
import FeatherIcon from 'feather-icons-react';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import order_my from '../../assets/images/illustrator/order_my.svg';
import profile from '../../assets/images/illustrator/profile.svg';
import '../../assets/css/style.css';

import request from '../../utils/request';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathItems: [
        // id must required
        { id: 1, name: 'Landrick', link: '/index' },
        { id: 2, name: 'Page', link: '#' },
        { id: 3, name: 'Account', link: '/page-profile' },
        { id: 4, name: 'Setting' },
      ],
      oldPass: '',
      newPass: '',
      newPassC: '',
      passNotOld: false,
      passNotMatch: false,
      successMsg2: false,
      successMsg3: false,
      user: '',
      profileLoading: false,
      ordersCount: 0,
      orders: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOldPassChange = this.onOldPassChange.bind(this);
    this.onNewPassChange = this.onNewPassChange.bind(this);
    this.onNewPassConfirmChange = this.onNewPassConfirmChange.bind(this);
  }

  componentDidMount() {
    document.body.classList = '';
    window.addEventListener('scroll', this.scrollNavigation, true);

    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.setState({ user: foundUser });
    }

    if (this.state.user == null) {
      console.log('User is null');
    } else console.log(`user: ${this.state.user}`);

    // document.getElementById('brandLogo').style = "max-height:80px;position:absolute";

    // Add dummy order
    const order = {
      name: 'Am complete',
      id: '#F57GEH5675GTRH',
      date: '20/09/2020',
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log(`# of orders: ${orders.length}`);
    this.setState({ ordersCount: orders.length });

    orders.forEach(function(order, index) {
      console.log(`[${index}]: ${order.id}`);
    });

    const newOrder = {
      name: '2 Am complete',
      id: '#F57GEHbtrb5GTRH',
      date: '20/09/2020',
    };

    orders.push(newOrder);
    console.log(`Added order #${order.id}`);

    localStorage.setItem('orders', JSON.stringify(orders));

    this.setState({ orders });
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollNavigation, true);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ profileLoading: true });
    if (this.state.newPass !== this.state.newPassC) {
      this.setState({ passNotMatch: true });
      toast.error('Passwords do not match', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }
    console.log(this.state.oldPass);
    console.log(this.state.newPass);

    request
      .postPrivate('users/resetPassword', {
        oldPassword: this.state.oldPass,
        newPassword: this.state.newPass,
      })
      .then(response => {
        toast.success(response.data.msg);

        this.setState({ profileLoading: false });
      })
      .catch(error => {
        toast.error(error.response.data.msg);

        this.setState({ profileLoading: false });
      });
  }

  onOldPassChange(event) {
    event.preventDefault();
    const oldPassword = event.target.value;
    this.setState({
      oldPass: oldPassword,
    });
  }

  onNewPassChange(event) {
    event.preventDefault();
    const newPassword = event.target.value;
    this.setState({
      newPass: newPassword,
    });
  }

  onNewPassConfirmChange(event) {
    event.preventDefault();
    const newPassC = event.target.value;
    this.setState({
      newPassC,
    });
  }

  scrollNavigation = () => {
    document.getElementById('brandLogo').style =
      'max-height:80px;position:absolute';

    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (top > 80) {
      document.getElementById('topnav').classList.add('nav-sticky');
    } else {
      document.getElementById('topnav').classList.remove('nav-sticky');
    }
  };

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  handlePositionChange = position => {
    this.setState({ position });
  };

  addOrderToState(order) {
    this.setState(prevState => ({
      orders: [...prevState.orders, order],
    }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        <section className="section main-my">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="border-0 rounded shadow">
                  <CardBody>
                    <h5 className="text-md-left text-center">
                      Personal Detail :
                    </h5>

                    <div className="mt-3 text-md-left text-center d-sm-flex">
                      <img
                        src={profile}
                        className="avatar float-md-left avatar-medium rounded-circle shadow mr-md-4"
                        alt=""
                      />
                      <div className="mt-md-4 mt-3 mt-sm-0">
                        <h2 className="title mt-2 mr-1">
                          {' '}
                          {this.state.user.username}{' '}
                        </h2>
                      </div>
                    </div>

                    <Row>
                      <Col md="12">
                        <nav>
                          <div
                            className="nav nav-tabs nav-fill"
                            id="nav-tab"
                            role="tablist"
                          >
                            <a
                              className="nav-item nav-link active"
                              id="nav-home-tab"
                              data-toggle="tab"
                              href="#nav-home"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                            >
                              Address
                            </a>
                            <a
                              className="nav-item nav-link"
                              id="nav-profile-tab"
                              data-toggle="tab"
                              href="#nav-profile"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              Password
                            </a>
                            <a
                              className="nav-item nav-link"
                              id="nav-contact-tab"
                              data-toggle="tab"
                              href="#nav-contact"
                              role="tab"
                              aria-controls="nav-contact"
                              aria-selected="false"
                            >
                              My Orders
                            </a>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                          >
                            <h5 className="mt-3">Change delivery address :</h5>
                            <Form onSubmit={this.handleAddressSubmit}>
                              <Row className="mt-4">
                                <Col md="6" lg="6">
                                  <FormGroup className="position-relative">
                                    <Label>Delivery Address :</Label>
                                    <i>
                                      <FeatherIcon
                                        icon="lock"
                                        className="fea icon-sm icons"
                                      />
                                    </i>
                                    <Input
                                      onChange={this.onDeliveryAddressChange}
                                      value={this.state.deliveryAddress}
                                      type="text"
                                      className="form-control pl-5"
                                      placeholder="Enter delivery address"
                                      required
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="12" className="t-2 mb-0">
                                  <Button type="submit" color="primary">
                                    Save address
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="nav-profile"
                            role="tabpanel"
                            aria-labelledby="nav-profile-tab"
                          >
                            <h5 className="mt-3">Change password :</h5>
                            <Alert
                              color="primary"
                              isOpen={this.state.successMsg3}
                              toggle={() => {
                                this.setState({
                                  successMsg3: !this.state.successMsg3,
                                });
                              }}
                            >
                              Data sended successfully.
                            </Alert>
                            <Form onSubmit={this.handleSubmit}>
                              <Row className="mt-4">
                                <Col lg="12">
                                  <FormGroup className="position-relative">
                                    <Label>Old password :</Label>
                                    <i>
                                      <FeatherIcon
                                        icon="lock"
                                        className="fea icon-sm icons"
                                      />
                                    </i>
                                    <Input
                                      onChange={this.onOldPassChange}
                                      value={this.state.oldPass}
                                      type="password"
                                      className="form-control pl-5"
                                      placeholder="Old password"
                                      required
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="12">
                                  <FormGroup className="position-relative">
                                    <Label>New password :</Label>
                                    <i>
                                      <FeatherIcon
                                        icon="lock"
                                        className="fea icon-sm icons"
                                      />
                                    </i>
                                    <Input
                                      onChange={this.onNewPassChange}
                                      value={this.state.newPass}
                                      type="password"
                                      className="form-control pl-5"
                                      placeholder="New password"
                                      required
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="12">
                                  <FormGroup className="position-relative">
                                    <Label>Re-type New password :</Label>
                                    <i>
                                      <FeatherIcon
                                        icon="lock"
                                        className="fea icon-sm icons"
                                      />
                                    </i>
                                    <Input
                                      onChange={this.onNewPassConfirmChange}
                                      value={this.state.newPassC}
                                      type="password"
                                      className="form-control pl-5"
                                      placeholder="Re-type New password"
                                      required
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="12" className="t-2 mb-0">
                                  {!this.state.profileLoading ? (
                                    <Button color="primary">
                                      Save password
                                    </Button>
                                  ) : (
                                    <Button
                                      type="submit"
                                      className="btn btnstyle4"
                                    >
                                      <span style={{ color: '#000' }}>
                                        <i className="fa fa-spinner" />
                                      </span>{' '}
                                      Loading
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            </Form>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="nav-contact"
                            role="tabpanel"
                            aria-labelledby="nav-contact-tab"
                          >
                            <h5 className="mt-3">
                              My Orders ({this.state.ordersCount})
                            </h5>
                            <Alert
                              color="info"
                              isOpen={this.state.successMsg2}
                              toggle={() => {
                                this.setState({
                                  successMsg2: !this.state.successMsg2,
                                });
                              }}
                            >
                              Data sended successfully.
                            </Alert>

                            <Row className="fixed-height-row">
                              {Object.entries(this.state.orders).map(
                                ([key, order]) => (
                                  <Col
                                    key={key}
                                    lg={12}
                                    md={12}
                                    className="my-order mt-4 pt-2"
                                  >
                                    <div
                                      onClick={() =>
                                        this.onOrderClicked(key, order)
                                      }
                                      className="key-feature d-flex align-items-center p-3 rounded shadow bg-white"
                                    >
                                      <div className="icon text-center rounded-pill mr-3">
                                        <i>
                                          <img
                                            src={order_my}
                                            width="40px"
                                            alt="order"
                                          />
                                        </i>
                                      </div>
                                      <div className="content">
                                        <h4 className="title mb-0">
                                          {order.name}
                                        </h4>
                                        <span className="text-muted mb-0">
                                          {order.id}
                                        </span>
                                      </div>
                                    </div>
                                  </Col>
                                ),
                              )}
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              {this.state.isOneOrderClicked ? (
                <Col ld="4">
                  <table className="body-wrap">
                    <tbody>
                      <tr>
                        <td />
                        <td className="container" width="600">
                          <div className="content">
                            <table
                              className="main"
                              width="100%"
                              cellPadding="0"
                              cellSpacing="0"
                            >
                              <tbody>
                                <tr>
                                  <td className="content-wrap aligncenter">
                                    <table
                                      width="100%"
                                      cellPadding="0"
                                      cellSpacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td className="content-block">
                                            <h2>
                                              {this.state.selectedOrder.id}
                                            </h2>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="content-block">
                                            <table className="invoice">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {this.state.user.username}
                                                    <br />
                                                    ID{' '}
                                                    {
                                                      this.state.selectedOrder
                                                        .id
                                                    }
                                                    <br />
                                                    Date:{' '}
                                                    {
                                                      this.state.selectedOrder
                                                        .date
                                                    }
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table
                                                      className="invoice-items"
                                                      cellPadding="0"
                                                      cellSpacing="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>Item price</td>
                                                          <td className="alignright">
                                                            $20.00
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>Service 2</td>
                                                          <td className="alignright">
                                                            $10.00
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>Service 3</td>
                                                          <td className="alignright">
                                                            $6.00
                                                          </td>
                                                        </tr>
                                                        <tr className="total">
                                                          <td
                                                            className="alignleft"
                                                            width="80%"
                                                          >
                                                            Total{' '}
                                                          </td>
                                                          <td className="alignright">
                                                            $36.00
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="content-block">
                                            <a href="http://diggiart.com">
                                              Diggiart.com
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>{' '}
                          </div>
                        </td>
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </Col>
              ) : (
                ''
              )}
            </Row>
            <ToastContainer />
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default MyAccount;
