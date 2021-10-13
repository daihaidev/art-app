import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// Import Icons
import FeatherIcon from 'feather-icons-react';

class FooterWithoutMenuLightSocialOnly extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <footer className={`footer footer-bar ${this.props.class}`}>
          <Container className="text-center">
            <Row className="align-items-center">
              <Col sm="4">
                <div className="text-sm-left">
                  <p className="mb-0">© 2020-21 DiggiArt.com.</p>
                </div>
              </Col>
              <Col sm="4">
                <div className="d-flex justify-content-center">
                  <div className="form-inline">
                    {' '}
                    <a href="/cookie-consent">Cookies</a>
                    <span className="dot" />
                    <a href="/cookie-consent">Terms</a>
                  </div>
                </div>
              </Col>

              <Col sm="4" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <ul className="list-unstyled social-icon social text-sm-right mb-0">
                  <li className="list-inline-item mb-0">
                    <a
                      href="https://www.facebook.com/DiggiArt2020"
                      className="rounded mr-1"
                    >
                      <i>
                        <FeatherIcon
                          icon="facebook"
                          className="fea icon-sm fea-social"
                        />
                      </i>
                    </a>
                  </li>
                  <li className="list-inline-item mb-0">
                    <a
                      href="https://www.instagram.com/diggiart21/?hl=en"
                      className="rounded mr-1"
                    >
                      <i>
                        <FeatherIcon
                          icon="instagram"
                          className="fea icon-sm fea-social"
                        />
                      </i>
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}

export default FooterWithoutMenuLightSocialOnly;
