import React, { useStyles, Component, useContext } from 'react';
import MediaQuery from 'react-responsive';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { animateScroll as scroll, Link } from 'react-scroll';
import {
  ButtonDropdown,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import '../../../../assets/css/style.css';
// Import images
import logodark from '../../../../assets/images/logo-light.png';

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      isOpen: false,
      navLinks: [
        // Note : each child and nested child must have unique id
        { id: 1, link: 'diggiart', title: 'DiggiArt' },
        { id: 2, link: 'fungerar', title: 'Fungerar så här' },
        { id: 3, link: 'pris', title: 'Pris' },
        {
          id: 4,
          link: 'borja',
          title: 'Börja måla',
          child: [
            { id: 1, title: '3 till 5 år', link: '', href: '/kidsdrawing' },
            {
              id: 2,
              title: '6 år och äldre',
              link: '',
              href: '/professionaldrawing',
            },
          ],
        },
        { id: 6, link: 'support', title: 'Support' },
      ],
    };
    this.toggleLine = this.toggleLine.bind(this);
    this.openBlock.bind(this);
    this.openNestedBlock.bind(this);
    this.handleScrollToTop = this.handleScrollToTop.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleScrollToTop() {
    scroll.scrollToTop();
  }

  handleLogout() {
    localStorage.clear();
  }

  toggleLine() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  toggle() {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  }

  componentDidMount() {
    let matchingMenuItem = null;
    const ul = document.getElementById('top-menu');
    const items = ul.getElementsByTagName('a');
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = item => {
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add('active'); // li
      const parent1 = parent.parentElement;
      parent1.classList.add('active'); // li
      if (parent1) {
        const parent2 = parent1.parentElement;
        parent2.classList.add('active'); // li
        if (parent2) {
          const parent3 = parent2.parentElement;
          parent3.classList.add('active'); // li
          if (parent3) {
            const parent4 = parent3.parentElement;
            parent4.classList.add('active'); // li
          }
        }
      }
    }
  };

  openBlock = level2_id => {
    const tmpLinks = this.state.navLinks;
    tmpLinks.map(tmpLink =>
      // Match level 2 id
      tmpLink.id === level2_id
        ? (tmpLink.isOpenSubMenu = !tmpLink.isOpenSubMenu)
        : false,
    );
    this.setState({ navLinks: tmpLinks });
  };

  openNestedBlock = (level2_id, level3_id) => {
    const tmpLinks = this.state.navLinks;
    tmpLinks.map(tmpLink =>
      // Match level 2 id
      tmpLink.id === level2_id
        ? tmpLink.child.map(tmpchild =>
        // if level1 id is matched then match level 3 id
          tmpchild.id === level3_id
            ? // if id is matched then update status(level 3 sub menu will be open)
            (tmpchild.isOpenNestedSubMenu = !tmpchild.isOpenNestedSubMenu)
            : (tmpchild.isOpenNestedSubMenu = false),
        )
        : false,
    );
    this.setState({ navLinks: tmpLinks });
  };

  render() {
    return (
      <React.Fragment>
        <header id="topnav" className="defaultscroll sticky">
          <style
            dangerouslySetInnerHTML={{
              __html: `

                        #brandLogo {
                            max-height: 500px;
                            transition: max-height 0.25s ease-out;
                            overflow: hidden;
                        }

                        .brandSmall {
                            max-height: 80px;
                            transition: max-height 0.25s ease-in;
                        }

                    `,
            }}
          />
          <Container fluid>
            <MediaQuery maxDeviceWidth={767}>
              <div>
                <Link className="logo" to="/">
                  <img
                    src={logodark}
                    id="brandLogo"
                    height="80px"
                    alt=""
                    style={{ position: 'absolute' }}
                    onClick={this.handleScrollToTop}
                  />
                </Link>
              </div>
            </MediaQuery>
            <MediaQuery minDeviceWidth={768}>
              <div>
                <Link className="logo" to="/">
                  <img
                    src={logodark}
                    id="brandLogo"
                    className="brandSmall"
                    height="auto"
                    alt=""
                    style={{ position: 'absolute' }}
                    onClick={this.handleScrollToTop}
                  />
                </Link>
              </div>
            </MediaQuery>

            {/* <ButtonDropdown className="buy-button" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret color="primary">
                                Text
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem disabled>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown> */}
            <div className="dropdown show buy-button">
              <a
                className="btn btn-primary dropdown-toggle"
                href="#!"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Mitt konto
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  className="dropdown-item logout-btn"
                  href="#!"
                  onClick={this.handleLogout}
                >
                  Logga ut
                </a>
              </div>
            </div>

            {/* <div className="buy-button">
                            <a href="#!" onClick={this.handleLogout} rel="noopener noreferrer" id="buyButton" className="btn btn-primary">Logga ut</a>

                        </div> */}
            <div className="menu-extras">
              <div className="menu-item">
                <Link
                  to="#"
                  onClick={this.toggleLine}
                  className={
                    this.state.isOpen ? 'navbar-toggle open' : 'navbar-toggle'
                  }
                >
                  <div className="lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </Link>
              </div>
            </div>

            <div
              id="navigation"
              style={{ display: this.state.isOpen ? 'block' : 'none' }}
            >
              <ul className="navigation-menu" id="top-menu">
                {this.state.navLinks.map((navLink, key) =>
                  navLink.child ? (
                    <li className="has-submenu" key={key}>
                      {/* child item(menu Item) - Level 1 */}
                      <Link
                        to={navLink.link}
                        onClick={event => {
                          /*  event.preventDefault(); */ this.openBlock(
                            navLink.id,
                          );
                        }}
                      >
                        {navLink.title}
                      </Link>
                      <span className="menu-arrow" />
                      {navLink.isMegaMenu ? (
                        // if menu is mega menu(2 columns grid)
                        <ul
                          className={
                            navLink.isOpenSubMenu
                              ? 'submenu megamenu open'
                              : 'submenu megamenu'
                          }
                        >
                          <li>
                            <ul>
                              {navLink.child.map((item, childKey) =>
                                item.id < 12 ? (
                                  <li key={childKey}>
                                    <Link
                                      activeClass="active"
                                      to={item.link}
                                      href={item.link}
                                      spy
                                      smooth
                                      offset={-70}
                                      duration={500}
                                      onClick={this.toggleLine}
                                    />
                                  </li>
                                ) : null,
                              )}
                            </ul>
                          </li>
                        </ul>
                      ) : (
                        // if menu is not mega menu(1grid)
                        <ul
                          className={
                            navLink.isOpenSubMenu ? 'submenu open' : 'submenu'
                          }
                        >
                          {navLink.child.map((childArray, childKey) =>
                            childArray.nestedChild ? (
                              // sub menu item - Level 2
                              <li className="has-submenu" key={childKey}>
                                <Link
                                  to={childArray.link}
                                  onClick={event => {
                                    event.preventDefault();
                                    this.openNestedBlock(
                                      navLink.id,
                                      childArray.id,
                                    );
                                  }}
                                >
                                  {' '}
                                  {childArray.title}{' '}
                                  {childArray.isNew ? (
                                    <span className="badge badge-danger rounded">
                                      V 2.2
                                    </span>
                                  ) : null}
                                </Link>
                                <span className="submenu-arrow" />
                                <ul
                                  className={
                                    childArray.isOpenNestedSubMenu
                                      ? 'submenu open'
                                      : 'submenu'
                                  }
                                >
                                  {childArray.nestedChild.map(
                                    (nestedChildArray, nestedKey) => (
                                      // nested sub menu item - Level 3
                                      <li key={nestedKey}>
                                        <Link
                                          to={nestedChildArray.link}
                                          spy
                                          smooth
                                          offset={-70}
                                          href={nestedChildArray.link}
                                          onClick={this.toggleLine}
                                          duration={500}
                                        >
                                          {nestedChildArray.title}{' '}
                                          {nestedChildArray.isNewPage ? (
                                            <span className="badge badge-primary rounded">
                                              NEW
                                            </span>
                                          ) : null}
                                        </Link>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </li>
                            ) : (
                              <li key={childKey}>
                                <a target="_blank" href={childArray.href}>
                                  {childArray.title}
                                </a>
                                {/* <Link to={childArray.link} spy={true}
                                                                            smooth={true}
                                                                            offset={-70}
                                                                            href={childArray.link}
                                                                            onClick={this.toggleLine}
                                                                            duration={500}>{childArray.title}</Link> */}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={key}>
                      <Link
                        to={navLink.link}
                        spy
                        smooth
                        href={navLink.href}
                        offset={-70}
                        onClick={this.toggleLine}
                        duration={500}
                      >
                        {navLink.title}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
              {/* <div className="buy-menu-btn d-none">
                                <a href="#!" onClick={this.handleLogout} rel="noopener noreferrer" id="buyButton" className="btn btn-primary">Logga ut</a>
                            </div> */}
              <div className="dropdown show buy-menu-btn d-none">
                <a
                  className="btn btn-primary dropdown-toggle"
                  href="#!"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mitt konto
                </a>
                <div
                  className="dropdown-menu p-0"
                  aria-labelledby="dropdownMenuLink"
                >
                  <a
                    className="dropdown-item logout-btn"
                    href="#!"
                    onClick={this.handleLogout}
                  >
                    Logga ut
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </header>
      </React.Fragment>
    );
  }
}

export default withRouter(Topbar);
