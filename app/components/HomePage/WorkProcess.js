// React Basic and Bootstrap
import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import '../../../node_modules/react-image-lightbox/style.css';
import ProcessBox from "./components/Shared/ProcessBox";
//Import Components
import SectionTitle from "./components/Shared/SectionTitle";





class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processes : [
                { id : 1, title : "Klicka på ”Börja måla”", desc : "för att sedan välja nivå 3-5 år eller 6 år och äldre. Använd verktygen (penna, pensel, etc) för att börja skapa.", link : "#" },
                { id : 2, title : "När konstverket är klart", desc : " kan du välja att direkt klicka ”Skicka för tryck” eller ”Skapa konto” för att ”Spara bilden”", link : "#" },
                { id : 3, title : "Vi trycker tavlan", desc : "på canvasduk samt monterar den i en kilram av skandinaviskt furu. Efter 2-3 dagar går din beställning med post från oss", link : "#" },
            ],
        }
    }
    

    render() {
        const { photoIndex, isOpen } = this.state;
        return (
            <React.Fragment>
                <section id="fungerar" className="section mb-0">
                    <Container>
                        {/* section title */}
                        <SectionTitle isLeft={true} title="DiggiArt - så här fungerar det" desc="" />

                        <Row>
                            {/* process box */}
                            <ProcessBox processes={this.state.processes} />
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default About;