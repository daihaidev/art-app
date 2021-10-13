/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Header from '../Header';
import Footer from '../Footer';
import Modals from '../Modals';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  adaptiveHeight: false,
  centerMode: true,
  initialSlide: 3,
  autoplay: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false
      }
    }
  ]
};

const HomePage = () => {
  return (
    <div className="main-wrap">
      <Header />
      {/* <img src={require('../../assets/images/avatar.png')} /> */}
      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Art for Everyone</h1>
              <div className="d-flex justify-content-between align-items-center">
                <p>Materpieces are always crafted with craziness<br/> and a lot of discipline.</p>
                
              </div>
            </div>
            <div className="col-md-4">
                <div className="play">
                  <a data-toggle="modal" data-target="#video" href="#">
                  <i class="far fa-play-circle"></i>
                  </a>
                  <Modals />
                  <Link to="/signup" className="btn btnstyle1">Let's Try</Link>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="features">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-12">
              <div className="maintitle">
                <h2>Features</h2>
              </div>
              <p className="ml-10">Customised experience for every age user.</p>
              <div className="ctabutton">
                <Link to="/signup" className="btn btnstyle1">Let's Try</Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="row align-items-center">
                <div className="col-xl-6 col-md-6">
                
                    <div className="card shadow">
                    <Link to="/kidsdrawing">
                      <div className="title">
                        <h3>Level 1</h3>
                        <small>Age 1-3</small>
                      </div>
                      <p>Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit. 
                            Phasellus fermentum varius felis,
                            non pharetra tellus. Sed pulvinar
                            egestas lacus ut viverra. Integer in
                            auctor odio. Suspendisse aliquet
                            sem ac eros pulvinar ornare.</p>
                      </Link>
                    </div>
                  
                  <div className="card shadow">
                    <div className="title">
                      <h3>Coming Soon</h3>
                      <small>Adult</small>
                    </div>
                    <p>Lorem ipsum dolor sit amet, 
                          consectetur adipiscing elit. 
                          Phasellus fermentum varius felis,
                          non pharetra tellus. Sed pulvinar
                          egestas lacus ut viverra. Integer in
                          auctor odio. Suspendisse aliquet
                          sem ac eros pulvinar ornare.</p>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="card shadow">
                  <Link to="/professionaldrawing">
                    <div className="title">
                      <h3>Level 2</h3>
                      <small>Adult</small>
                    </div>
                    <p>Lorem ipsum dolor sit amet, 
                          consectetur adipiscing elit. 
                          Phasellus fermentum varius felis,
                          non pharetra tellus. Sed pulvinar
                          egestas lacus ut viverra. Integer in
                          auctor odio. Suspendisse aliquet
                          sem ac eros pulvinar ornare.</p>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how_works" className="work">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="maintitle">
                <h2>How Digiart works</h2>
              </div>
              <p className="ml-10">Lorem ipsum dolor sit amet, consectetur<br/>
                      adipiscing elit. Phasellus fermentum varius<br/> 
                      felis, non pharetra tellus.</p>
            </div>
            <div className="col-md-7">
              <div className="worksteps">
                <img className="img-fluid" src={require('../../assets/images/worksteps.png')} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="download" className="apps">
        <div className="container">
          <div className="row shadow">
            <div className="col-md-7 order-last order-md-first">
              <div className="worksteps">
                <img className="img-fluid" src={require('../../assets/images/apps.png')} />
              </div>
            </div>
            <div className="col-md-5">
              <div className="maintitle">
                <h2>Our Apps</h2>
              </div>
              <p className="ml-10">Lorem ipsum dolor sit amet, consectetur<br/>
                      adipiscing elit. Phasellus fermentum varius<br/> 
                      felis, non pharetra tellus.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="maintitle">
                <h2>Testimonials</h2>
              </div>
              <p className="ml-10">Lorem ipsum dolor sit amet, consectetur<br/>
                      adipiscing elit. Phasellus fermentum varius<br/> 
                      felis, non pharetra tellus.</p>
            </div>
            <div className="col-md-6">
              <Slider {...settings}>
                <div>
                  <div className="card shadow">
                    <p>Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Phasellus fermentum varius
                      felis, non pharetra tellus.</p>
                    <div className="desg">
                      <h3>Name Surname</h3>
                      <small>CEO & Founder</small>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card shadow">
                    <p>Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Phasellus fermentum varius
                      felis, non pharetra tellus.</p>
                    <div className="desg">
                      <h3>Name Surname</h3>
                      <small>CEO & Founder</small>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card shadow">
                    <p>Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Phasellus fermentum varius
                      felis, non pharetra tellus.</p>
                    <div className="desg">
                      <h3>Name Surname</h3>
                      <small>CEO & Founder</small>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card shadow">
                    <p>Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Phasellus fermentum varius
                      felis, non pharetra tellus.</p>
                    <div className="desg">
                      <h3>Name Surname</h3>
                      <small>CEO & Founder</small>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card shadow">
                    <p>Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Phasellus fermentum varius
                      felis, non pharetra tellus.</p>
                    <div className="desg">
                      <h3>Name Surname</h3>
                      <small>CEO & Founder</small>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card shadow">
                    <p>Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Phasellus fermentum varius
                      felis, non pharetra tellus.</p>
                    <div className="desg">
                      <h3>Name Surname</h3>
                      <small>CEO & Founder</small>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section id="faqs" className="faqs">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-12">
              <h2>FAQs</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="accordionbg">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#faq1" aria-expanded="true" aria-controls="faq1">
                      <h3>
                    How to draw something?
                      </h3>
                    </div>
                    <div id="faq1" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum varius felis, non pharetra tellus.</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#faq2" aria-expanded="false" aria-controls="faq2">
                      <h3>
                    How to scan baby feets?
                      </h3>
                    </div>
                    <div id="faq2" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum varius felis, non pharetra tellus.</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#faq3" aria-expanded="false" aria-controls="faq3">
                      <h3>
                    How to order print?
                      </h3>
                    </div>
                    <div id="faq3" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum varius felis, non pharetra tellus.</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#faq4" aria-expanded="false" aria-controls="faq4">
                      <h3>
                    How to recieve order?
                      </h3>
                    </div>
                    <div id="faq4" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum varius felis, non pharetra tellus.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="support" className="cta">
        <div className="container">
          <div className="ctawrap">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h2>Looking to print your art?</h2>
                <p>Let us do it for you!</p>
              </div>
              <div className="col-md-4 text-right">
                <Link to="/" className="btn btnstyle2">Place an order</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact container">
        <div className="halfbg ">
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <h2>Get in touch with us</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus 
                fermentum varius felis, non pharetra tellus. Sed pulvinar egestas lacus 
                ut viverra. Integer in auctor odio. Suspendisse aliquet sem ac eros pulvinar 
                ornare.</p>
                <i className="fas fa-envelope" /> <span>info@info.net</span><br /><br />
                <i className="fas fa-phone" /> <Link to="/"><span>833 833 833</span></Link><br /><br />
                <i className="fas fa-map-marker-alt" /> <span>6114 Bentwick Lane Columbus, Ohio 43230</span>
              </div>
              
              <Formik
                initialValues={{ name: '', email: '', tel: '', msg: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Email required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  if (!values.name) {
                    errors.name = 'Name required';
                  }
                  if (!values.tel) {
                    errors.tel = 'Phone required';
                  }
                  if (!values.msg) {
                    errors.msg = 'Msg required';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting }) => (
                  <div className="contact-form">
                    <Form id="contactform" className action method="post">
                      <ErrorMessage name="name" className="error" component="div" />
                      <Field type="text" name="name" placeholder="Name" />
                      <ErrorMessage name="email" className="error" component="div" />
                      <Field type="email" name="email" placeholder="Email" />
                      <ErrorMessage name="tel" className="error" component="div" />
                      <Field type="tel" name="tel" placeholder="Phone number" />
                      <ErrorMessage name="msg" className="error" component="div" />
                      <Field name="msg" rows={4} placeholder="Message" />
                      
                      <button type="submit" name="submit" disabled={isSubmitting} className="btn btnstyle1">Send Message</button>
                    </Form>
                  </div>
                 
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      

      <Footer />
    </div>
  )
}
export default HomePage;