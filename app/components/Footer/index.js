/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
        <>
            <footer>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="footerwrap">
                      <div className="copyright">
                        <p>Copyright &copy; 2020 Digiart. All Rights Reserved.</p>
                      </div>
                      <div className="social">
                        <ul>
                          <li>
                            <Link to="/">
                              <i className="fab fa-facebook-f" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-twitter" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-linkedin-in" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-instagram" />
                            </Link>
                          </li>
                        </ul>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </footer>
        </>
  )
}
export default Footer;