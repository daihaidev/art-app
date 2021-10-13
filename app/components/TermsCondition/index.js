/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Header from '../Header';
import Footer from '../Footer';



const TermsCondition = () => {

  useEffect(() => {
    document.body.classList = "";
    document.getElementById('brandLogo').classList.add('brandSmall');
    document.getElementById('topnav').style = "background-color: white;";
    document.getElementById('brandLogo').style = "margin-top:20px;max-height:80px;position:absolute";
  });

  return (

    <div className="main-wrap">
      <Header blackhead />
      <section className="termscondition">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <h1>K&ouml;pvillkorDiggiArt</h1>
              <h3>F&ouml;retagsinformation</h3>
              <p>Juridiskt namn: Digitalprint i &Ouml;ster&aring;ker AB<br /> Org. nummer: 556835-7866<br /> Postadress: Box 367, 18424 &Aring;kersberga, Sverige<br /> Gatuadress: Stationsgr&auml;nd 24, 18450 &Aring;kersberga, Sverige<br /> Telefon:&nbsp;<a href="tel:031448178">08-540 666 40</a><br /> E-post:&nbsp;<a href="mailto:info@skyltmax.se">info@diggiart.com</a></p>
              <h3>Allm&auml;nt</h3>
              <p>F&ouml;ljande villkor g&auml;ller best&auml;llningar som g&ouml;rs av kunden hos DiggiArt(nedan &rdquo;oss&rdquo;, &rdquo;vi&rdquo; eller &rdquo;DiggiArt&rdquo;) via diggiart.com.</p>
              <p>N&auml;r du slutf&ouml;r en best&auml;llning ing&aring;s ett avtal mellan dig och DiggiArt, som g&auml;ller f&ouml;r din best&auml;llning vilket inkluderar eventuella fr&aring;gor eller tvister som uppkommer som en f&ouml;ljd av din best&auml;llning. Den version av villkoren som &auml;r till&auml;mplig f&ouml;r din best&auml;llning &auml;r den version som finns tillg&auml;nglig p&aring; DiggiArt.com vid den tidpunkt d&aring; du genomf&ouml;r din order. N&auml;r vi har tagit emot din best&auml;llning skickas en bekr&auml;ftelse till den e-postadress som du anv&auml;nde n&auml;r du genomf&ouml;rde ditt k&ouml;p. T&auml;nk d&auml;rf&ouml;r p&aring; att ange korrekt e-postadress d&aring; bekr&auml;ftelsen kan beh&ouml;vas vid eventuell framtida kontakt med v&aring;r kundservice. Vi ber dig v&auml;nligen kontakta oss s&aring; snart som m&ouml;jligt f&ouml;r det fall att bekr&auml;ftelsen inte kommer fram till dig.&nbsp;</p>
              <p>Vi ing&aring;r ej avtal med omyndig person utan m&aring;lsmans till&aring;telse.</p>
              <h3>Priser</h3>
              <p>Priser p&aring; sidan visas i SEK inklusive moms. I sista steget av best&auml;llningen ser du belopp att betala med moms och frakt inkluderat, innan du bekr&auml;ftar din best&auml;llning.</p>
              <p>Vi f&ouml;rbeh&aring;ller oss r&auml;tten att avbryta best&auml;llningar i de fall d&aring; kundens egna bilder inte h&aring;ller tillr&auml;ckligt h&ouml;g kvalitet f&ouml;r tillverkning, samt vid tekniska fel.</p>
              <p>Vi f&ouml;rbeh&aring;ller oss r&auml;tten att neka best&auml;llningar som inneh&aring;ller ol&auml;mpligt och/eller st&ouml;tande inneh&aring;ll. Detta g&auml;ller exempelvis pornografiska, rasistiska och nazistiska logotyper/motiv och/eller budskap. Du &auml;r sj&auml;lv ansvarig f&ouml;r att materialet inte strider mot lag eller f&ouml;rordning.</p>
              <p>Vi f&ouml;rbeh&aring;ller oss r&auml;tten till pris&auml;ndringar fr&aring;n tid till annan utan f&ouml;reg&aring;ende avisering. Det pris som g&auml;ller f&ouml;r ditt k&ouml;p &auml;r det pris som finns tillg&auml;ngligt p&aring; DiggiArt.com vid den tidpunkt d&aring; du genomf&ouml;r din order.&nbsp;</p>
              <h3>Frakt</h3>
              <p>Fraktkostnaden ing&aring;r alltid.</p>
              <p>DiggiArt anv&auml;nder PostNord AB och DHL som leverant&ouml;rer f&ouml;r leverans av best&auml;llningar. F&ouml;r privatpersoner anl&auml;nder paketet till n&auml;rmsta postombud och avisering sker med brev.</p>
              <h3>Leveranstid inom Sverige</h3>
              <p>Leveranstider4-5 dagar g&auml;ller f&ouml;r leveranser inom Sverige.</p>
              <p>Vi str&auml;var alltid efter att leverera v&aring;ra varor inom angivna tidsramar, men f&ouml;rseningar kan vid ov&auml;ntade h&auml;ndelser f&ouml;rekomma. Vid eventuella f&ouml;rseningar kontaktas kunden s&aring; snart som m&ouml;jligt via telefon eller e-post, varp&aring; ny leveranstid best&auml;ms. Om varan inte har kommit fram till angiven leveransadress inom 14 dagar, ber vi dig att kontakta oss, g&auml;rna via e-post eller telefon. Du har r&auml;tt att h&auml;va k&ouml;pet om dr&ouml;jsm&aring;let &auml;r av v&auml;sentlig betydelse. I h&auml;ndelse av att leveranstiden &ouml;verstiger 30 dagar har du alltid r&auml;tt att h&auml;va ditt k&ouml;p.&nbsp;</p>
              <p>Best&auml;llning som inte h&auml;mtas inom 14 dagar returneras till oss. F&ouml;r det fall att f&ouml;rs&auml;ndelsen inte h&auml;mtas ut i tid st&aring;r kunden f&ouml;r returfraktskostnaden.</p>
              <p>DiggiArt st&aring;r f&ouml;r transportrisken n&auml;r varan levereras till dig. Kunden st&aring;r dock f&ouml;r transportrisken n&auml;r varan &aring;ters&auml;nds till oss, f&ouml;r det fall att en retur av vara &auml;r n&ouml;dv&auml;ndig.</p>
              <h3>Personuppgifter</h3>
              <p>Digitalprint i &Ouml;ster&aring;ker AB &auml;r personuppgiftsansvarig f&ouml;r de personuppgifter som samlas in i samband med din best&auml;llning. N&auml;r du handlar hos oss anger du personuppgifter s&aring;som namn, adress, e-postadress och telefonnummer. Det &auml;r uppgifter vi beh&ouml;ver f&ouml;r att kunna leverera ordern till dig, men &auml;ven f&ouml;r att hantera eventuella reklamations&auml;renden och administrera senare best&auml;llningar. Kunden ansvarar sj&auml;lv f&ouml;r att leveransadressen &auml;r korrekt. E-postadressen kan komma att anv&auml;ndas f&ouml;r utskick av v&aring;rt nyhetsbrev. Prenumeration p&aring; nyhetsbrev kan enkelt avslutas och du kan &auml;ven vid best&auml;llningstillf&auml;llet v&auml;lja att du inte &ouml;nskar ta emot nyhetsbrev fr&aring;n oss.</p>
              <p>Som kund har du r&auml;tt att ta del av den information vi har registrerat om dig. Du har &auml;ven, bland annat, r&auml;tt att p&aring; beg&auml;ran f&aring; dina uppgifter korrigerade eller raderade. Om du &ouml;nskar ta emot s&aring;dan information ber vi dig kontakta oss p&aring; info@diggiart.com. Personuppgifterna l&auml;mnas inte ut till tredje part med undantag f&ouml;r inkasso&auml;renden och till samarbetsparters i syfte att kunna hantera din order.&nbsp;</p>
              <p>F&ouml;r fullst&auml;ndig information kring v&aring;r hantering av dina personuppgifter samt dina r&auml;ttigheter s&aring; h&auml;nvisar vi till v&aring;r&nbsp;<a href="https://skyltmax.se/integritetspolicy">Personuppgiftspolicy</a>.</p>
              <h3>Betalning och best&auml;llning</h3>
              <p>Din order bekr&auml;ftas n&auml;r du klickar p&aring; "Slutf&ouml;r k&ouml;p". Skulle din betalning misslyckas har du chans att testa igen eller byta betals&auml;tt i n&auml;sta steg. Vi erbjuder f&ouml;ljande alternativ:</p>
              <h3>Betalning via Klarna</h3>
              <p>Som betalningsleverant&ouml;r samarbetar vi med Klarna f&ouml;r att du som kund skall f&aring; ett enkelt och tryggt betals&auml;tt. Klarna Bank AB, organisationsnummer SE556737-0431</p>
              <p>I samarbete med Klarna erbjuder vi fakturabetalning, delbetalning, kontokortsbetalning samt direktbetalning. Denna betalningsl&ouml;sning kallas Klarna Checkout.<br /> Genom k&ouml;pet godk&auml;nner du dels v&aring;ra k&ouml;pvillkor, dels&nbsp;<a href="https://www.klarna.com/se/villkor/">Klarnas villkor</a>.</p>
              <p>Klarna Checkout presenterar viss information f&ouml;r dig s&aring; snart du &auml;r identifierad. Vilken information du beh&ouml;ver ange f&ouml;r att uppn&aring; identifiering kan variera mellan olika k&ouml;ptillf&auml;llen och kunder. N&aring;gon kreditupplysning tas aldrig direkt i Klarna Checkout utan vid behov beroende p&aring; det betalningsalternativ du har valt. Kreditupplysningar som tas av Klarna p&aring;verkar inte din kreditv&auml;rdighet och kan inte ses av andra som beg&auml;r kreditupplysning om dig, t ex banker. Sedan du har identifierats uppvisar Klarna Checkout vilka alternativ som &auml;r tillg&auml;ngliga f&ouml;r just dig. Faktura &auml;r f&ouml;rvalt som betalningsalternativ men du kan givetvis fritt v&auml;lja n&aring;got av de andra alternativen s&aring;som direktbetalning via bank, betalning med kort eller delbetalning. F&ouml;r det fall du v&auml;ljer delbetalning g&auml;ller Klarnas villkor f&ouml;r delbetalning. Vilka alternativ du erbjuds kan v&auml;xla fr&aring;n tid till annan. Du kan sj&auml;lv v&auml;lja om du vill skydda din anv&auml;ndning av Klarna Checkout med en PIN-kod.</p>
              <p>F&ouml;r mer information om Klarnas betals&auml;tt eller din betalning bes&ouml;k&nbsp;<a href="https://www.klarna.se/">klarna.se</a>.</p>
              <h3>Swish:</h3><p> Swish &auml;r en mobil betaltj&auml;nst d&auml;r du enkelt, snabbt och s&auml;kert kan &ouml;verf&ouml;ra pengar. Du godk&auml;nner ditt k&ouml;p med Mobilt BankID och f&aring;r omedelbart en betalningsbekr&auml;ftelse. Pengarna dras fr&aring;n ditt anslutna konto.</p>
              <h3>Avbest&auml;llning</h3>
              <p>Du har m&ouml;jlighet att avbest&auml;lla din vara fram till dess att leveransen har p&aring;b&ouml;rjats, vilket g&ouml;rs genom att ringa oss p&aring; 08-540 666 40. N&auml;r v&auml;l leveransen har p&aring;b&ouml;rjats kan du inte l&auml;ngre avbest&auml;lla leveransen.</p>
              <h3>&Aring;ngerr&auml;tt </h3>
              <p>För konsumenter (privatpersoner) gäller lagstiftad 14 dagars ångerrätt från mottagen vara. Detta gäller endast standardiserade produkter. För samtliga produkter som anpassas av kunden, gäller ingen ångerrätt. Företagskunder har ej ångerrätt om inget annat avtalats.</p>
              <h3>Reklamation</h3>
              <p>Om en vara av n&aring;gon anledning beh&ouml;ver reklameras ber vi dig att kontakta v&aring;r kundservice via e-post p&aring; f&ouml;ljande adress: info@diggiart.com. Du kan &auml;ven kontakta oss via v&aring;ra &ouml;vriga kontaktuppgifter som omn&auml;mns ovan. Vi beh&ouml;ver ditt ordernummer, en beskrivning av felet samt helst ett foto p&aring; den felaktiga produkten. Vi kan komma att kr&auml;va att den felaktiga produkten &aring;ters&auml;nds tills oss f&ouml;r vidare kontroll. Om ett tillverkningsfel eller skada i transport konstateras, godk&auml;nns reklamationen.</p>
              <p>Kunden ers&auml;tts f&ouml;r eventuella returkostnader vid godk&auml;nd reklamation. V&auml;nligen notera att en reklamation alltid m&aring;ste g&ouml;ras inom sk&auml;lig tid (tv&aring; (2) m&aring;nader anses alltid vara sk&auml;lig tid). Om en reklamation godk&auml;nns kompenserar vid dig i enlighet med reglerna i konsumentk&ouml;plagen (1990:932) genom reparation av befintlig produkt, genom en ny likv&auml;rdig produkt, prisreduktion eller genom att du &aring;terf&aring;r din betalning f&ouml;r produkten (inkl. frakt- och returkostnader).&nbsp;</p>
              <p>Vi &aring;terbetalar kunden senast inom 10 dagar r&auml;knat fr&aring;n det att avtalet har h&auml;vts p&aring; riktiga grunder. &Aring;terbetalning g&ouml;rs med samma betalningss&auml;tt som du anv&auml;nde n&auml;r du genomf&ouml;rde k&ouml;pet. F&ouml;r det fall att vi kr&auml;ver att varan returneras f&ouml;r kontroll, g&ouml;rs full &aring;terbetalning under f&ouml;ruts&auml;ttning att varan kommer oss tillhanda i v&auml;sentligen samma skick som den var n&auml;r varan levererades till dig. Om en returnerad vara har anv&auml;nts eller hanterats i st&ouml;rre utstr&auml;ckning &auml;n som varit n&ouml;dv&auml;ndigt f&ouml;r att fastst&auml;lla dess egenskaper och funktion, har DiggiArt r&auml;tt till ett avdrag f&ouml;r v&auml;rdeminskningen p&aring; varan som kan uppg&aring; till varans fullst&auml;ndiga pris.</p>
              <h3>Tvist</h3>
              <p>V&aring;r ambition &auml;r alltid att l&ouml;sa eventuella problem tillsammans med v&aring;ra kunder. Om du har problem med en produkt som du har k&ouml;pt fr&aring;n DiggiArt och f&ouml;r det fall att du inte har lyckats l&ouml;sa tvisten tillsammans med oss, kan du l&auml;mna in ett klagom&aring;l till:&nbsp;Allm&auml;nna Reklamationsn&auml;mnden,&nbsp;<a href="https://www.arn.se/">www.arn.se</a><br /> Box 174<br /> 101 23 Stockholm</p>
              <p>Vid eventuell tvist f&ouml;ljer vi Allm&auml;nna reklamationsn&auml;mndens rekommendationer.</p>
              <p>Du kan &auml;ven kontakta konsumentv&auml;gledaren i din kommun eller, vid gr&auml;ns&ouml;verskridande k&ouml;p, skicka ditt klagom&aring;l till EU:s plattform f&ouml;r tvistl&ouml;sning p&aring; n&auml;tet, vilken &auml;r tillg&auml;nglig p&aring;&nbsp;<a href="https://webgate.ec.europa.eu/odr/main/?event=main.home.show&amp;reload=false">EC Online Dispute Resolution</a>.</p>
              <h3>Klausurers giltighet</h3>
              <p>F&ouml;r det fall att delar av dessa villkor f&ouml;rklaras ogiltiga eller d&ouml;ms ut som verkningsl&ouml;sa av domstol eller tillsynsmyndighet, ska detta inte p&aring;verka giltigheten av &aring;terst&aring;ende villkor.</p>
              <h3>Force Majeure</h3>
              <p>DiggiArt undantas genom dessa villkor ansvar f&ouml;r skador eller f&ouml;rseningar som har sin grund i omst&auml;ndighet som ligger utanf&ouml;r v&aring;r kontroll. Exempel p&aring; s&aring;dana omst&auml;ndigheter &auml;r &ouml;versv&auml;mningar, br&auml;nder, avbrott i arbete, f&ouml;rbud, restriktioner, sabotage, d&aring;liga transport- och v&auml;derf&ouml;rh&aring;llanden och krig.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
export default TermsCondition;