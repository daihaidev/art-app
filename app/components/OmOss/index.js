// React Basic and Bootstrap
import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';


class OmOss extends Component {
  componentDidMount() {
        document.body.classList = "";
        // document.getElementById('brandLogo').classList.add('brandSmall');
        // document.getElementById('topnav').style = "background-color: white;";
        // document.getElementById('brandLogo').style = "margin-top:20px;max-height:auto;background-color:white;position:absolute";
        window.addEventListener("onload", this.scrollNavigation, true);
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("onload", this.scrollNavigation, true);
    }

    scrollNavigation = () => {


    }


  render() {
    return (
      <React.Fragment>
        <section id="fungerar" className="">
          <Container className="section mb-0 mt-5 pl-5">
            {/* section title */}

            <h3>Juridiskt namn</h3>
            <p>Digitalprint i Österåker AB</p><br />


            <h4>Org.nr</h4>
            <p>556835-7866</p>

            <h4>Adress</h4>
            <p>
            Postadress<br />
            Box 367<br />
            18424 Åkersberga<br />
            Sverige<br /><br />
            Gatuadress<br />
            Stationsgränd 24<br />
            18450 Åkersberga<br /> <br />
            Sverige<br />
            </p>

            <h4>Mail</h4>
            <p><a href="mailto:support@diggiart.com">support@diggiart.com</a></p>
            <p>Besvaras inom 24h vardagar.</p>

            <h4>Telefon</h4>
            <p><a href="tel:08-540 666 40">08-540 666 40</a></p>
            <p>Vardagar 09.30-16.00 Lunchstängt mellan 12-13.</p>

            <Row>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default OmOss;
