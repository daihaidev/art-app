// React Basic and Bootstrap
import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import 'react-image-lightbox/style.css';
import SectionTitle from './SectionTitle';


class CookiePageComponent extends Component {

  componentDidMount() {
    document.body.classList = "";
    // document.getElementById('brandLogo').classList.add('brandSmall');
    // document.getElementById('topnav').style = "background-color: white;";
    // document.getElementById('brandLogo').style = "margin-top:20px;max-height:auto;position:absolute";
    //window.addEventListener("onload", this.scrollNavigation, true);
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
        <section id="fungerar" className="section mb-0">
          <Container>
            {/* section title */}
            <SectionTitle isLeft={true} title="Köpvillkor DiggiArt" desc="" />

            <h3>Företagsinformation</h3>
            <p>Juridiskt namn: Digitalprint i Österåker AB<br />
                        Org. nummer: 556835-7866<br />
                        Postadress: Box 367, 18424 Åkersberga, Sverige<br />
                        Gatuadress: Stationsgränd 24, 18450 Åkersberga, Sverige<br />
                        Telefon: <a href="tel:08-540 666 40">08-540 666 40</a><br />
                        E-post: <a href="mailto:info@diggiart.com">info@diggiart.com</a></p>
            <h4>Allmänt</h4>
            <p>Följande villkor gäller beställningar som görs av kunden hos DiggiArt (nedan ”oss”, ”vi” eller ”DiggiArt”) via diggiart.com.</p>
            <p>När du slutför en beställning ingås ett avtal mellan dig och DiggiArt, som gäller för din beställning vilket inkluderar eventuella frågor eller tvister som uppkommer som en följd av din beställning. Den version av villkoren som är tillämplig för din beställning är den version som finns tillgänglig på DiggiArt.com vid den tidpunkt då du genomför din order. När vi har tagit emot din beställning skickas en bekräftelse till den e-postadress som du använde när du genomförde ditt köp. Tänk därför på att ange korrekt e-postadress då bekräftelsen kan behövas vid eventuell framtida kontakt med vår kundservice. Vi ber dig vänligen kontakta oss så snart som möjligt för det fall att bekräftelsen inte kommer fram till dig.</p>
            <p>Vi ingår ej avtal med omyndig person utan målsmans tillåtelse.</p>
            <h4>Priser</h4>
            <p>Priser på sidan visas i SEK inklusive moms. I sista steget av beställningen ser du belopp att betala med moms och frakt inkluderat, innan du bekräftar din beställning.</p>
            <p>Vi förbehåller oss rätten att avbryta beställningar i de fall då kundens egna bilder inte håller tillräckligt hög kvalitet för tillverkning, samt vid tekniska fel.</p>
            <p>Vi förbehåller oss rätten att neka beställningar som innehåller olämpligt och/eller stötande innehåll. Detta gäller exempelvis pornografiska, rasistiska och nazistiska logotyper/motiv och/eller budskap. Du är själv ansvarig för att materialet inte strider mot lag eller förordning.</p>
            <p>Vi förbehåller oss rätten till prisändringar från tid till annan utan föregående avisering. Det pris som gäller för ditt köp är det pris som finns tillgängligt på DiggiArt.com vid den tidpunkt då du genomför din order.</p>
            <h4>Frakt</h4>
            <p>Fraktkostnaden ingår alltid.</p>
            <p>DiggiArt använder PostNord AB och DHL som leverantörer för leverans av beställningar. För privatpersoner anländer paketet till närmsta postombud och avisering sker med brev.</p>

            <h4>Leveranstid inom Sverige</h4>
            <p>Leveranstider 4-5 dagar gäller för leveranser inom Sverige.</p>
            <p>Vi strävar alltid efter att leverera våra varor inom angivna tidsramar, men förseningar kan vid oväntade händelser förekomma. Vid eventuella förseningar kontaktas kunden så snart som möjligt via telefon eller e-post, varpå ny leveranstid bestäms. Om varan inte har kommit fram till angiven leveransadress inom 14 dagar, ber vi dig att kontakta oss, gärna via e-post eller telefon. Du har rätt att häva köpet om dröjsmålet är av väsentlig betydelse. I händelse av att leveranstiden överstiger 30 dagar har du alltid rätt att häva ditt köp.</p>
            <p>Beställning som inte hämtas inom 14 dagar returneras till oss. För det fall att försändelsen inte hämtas ut i tid står kunden för returfraktskostnaden.</p>
            <p>DiggiArt står för transportrisken när varan levereras till dig. Kunden står dock för transportrisken när varan återsänds till oss, för det fall att en retur av vara är nödvändig.</p>
            <h4>Personuppgifter</h4>
            <p>Digitalprint i Österåker AB är personuppgiftsansvarig för de personuppgifter som samlas in i samband med din beställning. När du handlar hos oss anger du personuppgifter såsom namn, adress, e-postadress och telefonnummer. Det är uppgifter vi behöver för att kunna leverera ordern till dig, men även för att hantera eventuella reklamationsärenden och administrera senare beställningar. Kunden ansvarar själv för att leveransadressen är korrekt. E-postadressen kan komma att användas för utskick av vårt nyhetsbrev. Prenumeration på nyhetsbrev kan enkelt avslutas och du kan även vid beställningstillfället välja att du inte önskar ta emot nyhetsbrev från oss.</p>
            <p>Som kund har du rätt att ta del av den information vi har registrerat om dig. Du har även, bland annat, rätt att på begäran få dina uppgifter korrigerade eller raderade. Om du önskar ta emot sådan information ber vi dig kontakta oss på info@diggiart.com. Personuppgifterna lämnas inte ut till tredje part med undantag för inkassoärenden och till samarbetsparters i syfte att kunna hantera din order.</p>
            <p>För fullständig information kring vår hantering av dina personuppgifter samt dina rättigheter så hänvisar vi till vår <a href="#!">Personuppgiftspolicy</a>.</p>
            <h4>Betalning och beställning</h4>
            <p>Din order bekräftas när du klickar på "Slutför köp". Skulle din betalning misslyckas har du chans att testa igen eller byta betalsätt i nästa steg. Vi erbjuder följande alternativ:</p>
            <h4>Betalning via Klarna</h4>
            <p>Som betalningsleverantör samarbetar vi med Klarna för att du som kund skall få ett enkelt och tryggt betalsätt. Klarna Bank AB, organisationsnummer SE556737-0431<br /> I samarbete med Klarna erbjuder vi fakturabetalning, delbetalning, kontokortsbetalning samt direktbetalning. Denna betalningslösning kallas Klarna Checkout.<br />Genom köpet godkänner du dels våra köpvillkor, dels <a href="!#">Klarnas villkor</a>.<br />Klarna Checkout presenterar viss information för dig så snart du är identifierad. Vilken information du behöver ange för att uppnå identifiering kan variera mellan olika köptillfällen och kunder. Någon kreditupplysning tas aldrig direkt i Klarna Checkout utan vid behov beroende på det betalningsalternativ du har valt. Kreditupplysningar som tas av Klarna påverkar inte din kreditvärdighet och kan inte ses av andra som begär kreditupplysning om dig, t ex banker. Sedan du har identifierats uppvisar Klarna Checkout vilka alternativ som är tillgängliga för just dig. Faktura är förvalt som betalningsalternativ men du kan givetvis fritt välja något av de andra alternativen såsom direktbetalning via bank, betalning med kort eller delbetalning. För det fall du väljer delbetalning gäller Klarnas villkor för delbetalning. Vilka alternativ du erbjuds kan växla från tid till annan. Du kan själv välja om du vill skydda din användning av Klarna Checkout med en PIN-kod.<br />För mer information om Klarnas betalsätt eller din betalning besök <a href="http://www.klarna.se">klarna.se</a>.</p>
            <p><strong>Swish:</strong> Swish är en mobil betaltjänst där du enkelt, snabbt och säkert kan överföra pengar. Du godkänner ditt köp med Mobilt BankID och får omedelbart en betalningsbekräftelse. Pengarna dras från ditt anslutna konto.</p>
            <h4>Avbeställning</h4>
            <p>Du har möjlighet att avbeställa din vara fram till dess att leveransen har påbörjats, vilket görs genom att ringa oss på 08-540 666 40. När väl leveransen har påbörjats kan du inte längre avbeställa leveransen.</p>
            <h4>Ångerrätt</h4>
            <p>För konsumenter (privatpersoner) gäller lagstiftad 14 dagars ångerrätt från mottagen vara. Detta gäller endast standardiserade produkter. För samtliga produkter som anpassas av kunden, gäller ingen ångerrätt. Företagskunder har ej ångerrätt om inget annat avtalats.</p>
            <h4>Reklamation</h4>
            <p>Om en vara av någon anledning behöver reklameras ber vi dig att kontakta vår kundservice via e-post på följande adress: info@diggiart.com. Du kan även kontakta oss via våra övriga kontaktuppgifter som omnämns ovan. Vi behöver ditt ordernummer, en beskrivning av felet samt helst ett foto på den felaktiga produkten. Vi kan komma att kräva att den felaktiga produkten återsänds tills oss för vidare kontroll. Om ett tillverkningsfel eller skada i transport konstateras, godkänns reklamationen.</p>
            <p>Kunden ersätts för eventuella returkostnader vid godkänd reklamation. Vänligen notera att en reklamation alltid måste göras inom skälig tid (två (2) månader anses alltid vara skälig tid). Om en reklamation godkänns kompenserar vid dig i enlighet med reglerna i konsumentköplagen (1990:932) genom reparation av befintlig produkt, genom en ny likvärdig produkt, prisreduktion eller genom att du återfår din betalning för produkten (inkl. frakt- och returkostnader).</p>
            <p>Vi återbetalar kunden senast inom 10 dagar räknat från det att avtalet har hävts på riktiga grunder. Återbetalning görs med samma betalningssätt som du använde när du genomförde köpet. För det fall att vi kräver att varan returneras för kontroll, görs full återbetalning under förutsättning att varan kommer oss tillhanda i väsentligen samma skick som den var när varan levererades till dig. Om en returnerad vara har använts eller hanterats i större utsträckning än som varit nödvändigt för att fastställa dess egenskaper och funktion, har DiggiArt rätt till ett avdrag för värdeminskningen på varan som kan uppgå till varans fullständiga pris.</p>
            <h4>Tvist</h4>
            Vår ambition är alltid att lösa eventuella problem tillsammans med våra kunder. Om du har problem med en produkt som du har köpt från DiggiArt och för det fall att du inte har lyckats lösa tvisten tillsammans med oss, kan du lämna in ett klagomål till: Allmänna Reklamationsnämnden, <a href="www.arn.se">www.arn.se</a><br />
            Box 174<br />
            101 23 Stockholm<br />
            <p>Vid eventuell tvist följer vi Allmänna reklamationsnämndens rekommendationer.</p>
            <p>Du kan även kontakta konsumentvägledaren i din kommun eller, vid gränsöverskridande köp, skicka ditt klagomål till EU:s plattform för tvistlösning på nätet, vilken är tillgänglig på <a href="">EC Online Dispute Resolution</a>.
            <h4>Klausurers giltighet</h4>
              <p></p>För det fall att delar av dessa villkor förklaras ogiltiga eller döms ut som verkningslösa av domstol eller tillsynsmyndighet, ska detta inte påverka giltigheten av återstående villkor.</p>
            <h4>Force Majeure</h4>
            <p>DiggiArt undantas genom dessa villkor ansvar för skador eller förseningar som har sin grund i omständighet som ligger utanför vår kontroll. Exempel på sådana omständigheter är översvämningar, bränder, avbrott i arbete, förbud, restriktioner, sabotage, dåliga transport- och väderförhållanden och krig.</p>

            <Row>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default CookiePageComponent;