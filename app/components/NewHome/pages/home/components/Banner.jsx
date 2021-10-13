import React from 'react';
import service from '../../home/scss/services.jpg';


const Banner = () => {
  return (
    <>
      <section>
        <div className='banner-top mt-3' style={{
          width: "100%",
          height: "460px",
          padding: "4px 10px",
          backgroundImage: `url(${service})`,
          backgroundSize: "contain",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom"
        }}>
          <div className='banner-top-inner'>
            <p><span>BÄSTA JULKLAPPEN</span> till farmor/farfar och mormor/morfar</p>
            <p>Låt ditt barn få skapa sitt eget konstverk</p>
          </div>
        </div>
      </section>
      <section id='my_new_diggiart' className="">
        <div className='' id="my-banner">
          <div className="my-2">
            <h1>Färglägg och rita på egen hand - på dator, surfplatta eller mobil.</h1>
            <span style={{fontSize: "1.2rem"}}>Få tavlan tryckt på canvasduk (A4 eller A3) - inramning och frakt ingår.</span>
          </div>
        </div>
      </section>

    </>
  );
};

export default Banner;
