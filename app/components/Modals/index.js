/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { orderFormAddressSchema } from './schema';
import request from '../../utils/request';


const Modals = (props) => {
    const [showPaymentCredit, setshowPaymentCredit] = useState(true);
    const [showPaymentCreditSwish, setshowPaymentCreditSwish] = useState(false);
    const [prices, setPrices] = useState([]);
    const [price, setPrice] = useState({});
    const [number, setNumber] = useState(1);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);

    const editorRef = useRef(null);

    useEffect(() => {
        request.getPublic('users/getAllPrices')
            .then(response => {
                setPrices(response && response.data.prices);

            }).catch(error => {
                toast.error(error.response.data.msg);
            })
    }, []);

    const handleOrderSubmit = (values) => {
        const { firstName, lastName, email, phoneNumber, city, zipCode, address1, address2 } = values
        const p = price && price.price ? price.price * number : null;
        const f = price && price.format ? price.format : null;
        const q = number;
        const u = localStorage.getItem('accessToken') ? request.getProfile().id : null;
        let imageUrl;
        if (editorRef.current) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = editorRef.current.getImage();
            imageUrl = canvas.toDataURL();
            console.log(imageUrl);
        }
        request.postPublic('users/createOrder', { firstName, lastName, email, phoneNumber, city, zipCode, address1, address2, price: p, format: f, image: imageUrl, quantity: q, user: u })
            .then(response => {
                const { msg } = response && response.data;
                toast.success(msg);
                localStorage.getItem('accessToken') ? props.history.push('/myorders') : props.history.push('/kidsdrawing');
            }).catch(error => {
                toast.error('Something went wrong!');
            })
    }

    const zoomImage = (value) => {
        // e.preventDefault();
        // if (e.deltaY < 0) {
        //     setScale(scale + 0.3);
        // }
        // if (e.deltaY > 0 && scale > 1) {
        //     setScale(scale - 0.3);
        // }
    }

    const rotateImage = () => {
        setRotation(rotation === 360 ? 0 : rotation + 90)
    }

    return (
        <>

            <div className="modal fade printorder " id="printorder" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <h3 className="modal-title">Print Options</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "5rem" }}>
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body">
                            <Formik
                                initialValues={{ email: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Email required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
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
                                    <div className="printorderform">
                                        <Form id="contactform" method="post">
                                            <div className="formrow">
                                                <p>Paper Size</p>
                                                <select
                                                    name="papersize"
                                                >
                                                    <option value="" label="A4" />
                                                    <option value="" label="A11" />
                                                </select>
                                            </div>
                                            <div className="formrow">
                                                <p>Do you need a frame?</p>
                                                <Field type="checkbox" name="acceptTerms" className="checkbox" />
                                            </div>
                                            <div className="formrow">
                                                <p>Frame colour</p>
                                                <select
                                                    name="papersize"
                                                >
                                                    <option value="" label="White" />
                                                    <option value="" label="Black" />
                                                </select>
                                            </div>
                                            <div className="form-group2">
                                                <p className="grey">Email</p>
                                                <Field className="input" type="email" name="email" />
                                                <ErrorMessage name="email" className="error" component="div" />
                                            </div>
                                            <div className="form-group2">
                                                <p className="grey">Phone number</p>
                                                <Field className="input" type="tel" name="tel" />
                                                <ErrorMessage name="tel" className="error" component="div" />
                                            </div>
                                            <div className="form-group2">
                                                <p className="grey">Delivery address</p>
                                                <Field className="input" type="text" name="address" />
                                                <ErrorMessage name="address" className="error" component="div" />
                                            </div>
                                            <button type="submit" className="btn btnstyle4">Confirm</button>
                                        </Form>
                                    </div>

                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade printorder paymentdetails " id="paymentdetails" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <h3 className="modal-title">Payment Details</h3>
                        <p className="text-center">How do you want to pay?</p>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="paymentmethods">
                            <div className="credit">
                                <img onClick={() => { setshowPaymentCreditSwish(false); setshowPaymentCredit(true) }} src={require('../../assets/images/card1.png')} />
                                <i className={showPaymentCredit ? `d-block fas fa-check-circle` : `d-none `}></i>
                            </div>
                            <div className="swish">
                                <img onClick={() => { setshowPaymentCreditSwish(true); setshowPaymentCredit(false) }} src={require('../../assets/images/card2.png')} />
                                <i className={showPaymentCreditSwish ? `d-block fas fa-check-circle` : `d-none `}></i>
                            </div>
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={{ email: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Email required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
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
                                    <>
                                        <div className={showPaymentCredit ? `d-block  printorderform` : `d-none`}>
                                            <Form id="contactform" method="post">
                                                <h5>Credit Card Information</h5>
                                                <div className="form-group2">
                                                    <p className="grey">Cardholder’s Name</p>
                                                    <Field className="input" type="text" name="name" />
                                                    <ErrorMessage name="name" className="error" component="div" />
                                                </div>
                                                <div className="form-group2">
                                                    <p className="grey">Card Number</p>
                                                    <Field className="input" type="text" name="cn" />
                                                    <ErrorMessage name="cn" className="error" component="div" />
                                                </div>
                                                <div className="form-group2 d-flex justify-content-between">
                                                    <div className="expire">
                                                        <p className="grey">Expiry Date</p>
                                                        <Field className="input" type="text" name="ed" />
                                                        <ErrorMessage name="ed" className="error" component="div" />
                                                    </div>
                                                    <div className="cvv">
                                                        <p className="grey">CVV</p>
                                                        <Field className="input" type="text" name="cvv" />
                                                        <ErrorMessage name="cvv" className="error" component="div" />
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btnstyle4">Confirm</button>
                                            </Form>
                                        </div>

                                        <div className={showPaymentCreditSwish ? `d-block printorderform` : `d-none`}>
                                            <Form id="contactform" method="post">
                                                <h5>Credit Card Swish</h5>
                                                <div className="form-group2">
                                                    <p className="grey">Cardholder’s Name</p>
                                                    <Field className="input" type="text" name="name" />
                                                    <ErrorMessage name="name" className="error" component="div" />
                                                </div>
                                                <div className="form-group2">
                                                    <p className="grey">Card Number</p>
                                                    <Field className="input" type="text" name="cn" />
                                                    <ErrorMessage name="cn" className="error" component="div" />
                                                </div>
                                                <div className="form-group2 d-flex justify-content-between">
                                                    <div className="expire">
                                                        <p className="grey">Expiry Date</p>
                                                        <Field className="input" type="text" name="ed" />
                                                        <ErrorMessage name="ed" className="error" component="div" />
                                                    </div>
                                                    <div className="cvv">
                                                        <p className="grey">CVV</p>
                                                        <Field className="input" type="text" name="cvv" />
                                                        <ErrorMessage name="cvv" className="error" component="div" />
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btnstyle4">Confirm</button>
                                            </Form>
                                        </div>
                                    </>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="video" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <iframe src="https://www.youtube.com/embed/8P55AjTuXBc?controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade printorder paymentdetails paymentaccordion" id="paymentdetailssteps" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body">
                            <div className="accordion" id="paymentaccordion">
                                <div className="card">
                                    <div className="card-header shadow-sm" id="headingOne" data-toggle="collapse" data-target="#printorder" aria-expanded="true" aria-controls="printorder">
                                        <h5 >
                                            <h2>1</h2>
                                Välja storlek
                            </h5>
                                    </div>

                                    <div id="printorder" className="collapse show" aria-labelledby="headingOne" data-parent="#paymentaccordion">
                                        <div className="card-body">
                                            <div className="bggrey">
                                                <table className="table" border="1">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Format</th>
                                                            <th>Pris</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {prices && prices.length > 0 ?
                                                            prices.map(p => (
                                                                    <tr key={p._id}>
                                                                        <td className="text-center">
                                                                            <div className="form-check">
                                                                                <input onClick={() => setPrice(p)} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                                                            </div>
                                                                        </td>
                                                                        <td>{p.format}</td>
                                                                        <td className="price">{p.price} kr</td>
                                                                    </tr>
                                                                )) : null}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="">
                                                <div className="row">
                                                    <div className="col-md-6 bggrey">
                                                        <h5 className="mb-3">Liggande eller stanede</h5>
                                                        <div
                                                        // onWheel={zoomImage}
                                                        >
                                                            {/* <img
                                                                className="img-fluid productimg"
                                                                src={props.drawingImage}
                                                            /> */}
                                                            <AvatarEditor
                                                                ref={editorRef}
                                                                image={props.drawingImage}
                                                                scale={scale}
                                                                width={(rotation === 90 || rotation === 270) ? 200 : 300}
                                                                height={(rotation === 90 || rotation === 270) ? 300 : 200}
                                                                rotate={rotation}
                                                                border={2}
                                                            />
                                                        </div>
                                                        <img
                                                            title="Rotate"
                                                            alt="Rotate"
                                                            width={32}
                                                            className="img-fluid" onClick={rotateImage}
                                                            src={require('../../assets/images/update-arrow.png')}
                                                        />
                                                        <div className="slider">
                                                            <Slider
                                                                min={0.4}
                                                                max={5}
                                                                step={0.2}
                                                                // labels={{ 0: '-', 5: '+' }}
                                                                value={scale}
                                                                // onChangeStart={this.handleChangeStart}
                                                                onChange={value => setScale(value)}
                                                            // onChangeComplete={this.handleChangeComplete}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="">
                                                            <h5 className="mb-3">Sammanfattning</h5>
                                                            <div className="d-flex justify-content-between">
                                                                <p>Product:</p>
                                                                <p style={{ width: '100px', textAlign: 'center' }} >Fototavla</p>
                                                                <p></p>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>Format:</p>
                                                                <p style={{ width: '100px', textAlign: 'center' }}>{price.format || '---'}</p>
                                                                <p>{price && price.price ? `${price.price} kr` : '---'}</p>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>Artist:</p>
                                                                <input onChange={(e) => setNumber(e.target.value)} type="number" min="1" max="20" className="form-control form-control-sm numberfield" />
                                                                <p></p>
                                                            </div>

                                                        </div>
                                                        <hr />
                                                        <div className="d-flex justify-content-between">
                                                            <p>Pris:</p>
                                                            <p style={{ color: '#FF4C66' }} className="font-weight-bold">{price && price.price ? `${price.price * number} kr` : '---'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btnstyle3 d-block mx-auto mb-2" id="headingThree" data-toggle="collapse" data-target="#whatever" aria-expanded="false" aria-controls="whatever">Nasta</button>
                                    </div>

                                </div>
                                <div className="card">
                                    <div className="card-header shadow-sm" id="headingThree" data-toggle="collapse" data-target="#whatever" aria-expanded="false" aria-controls="whatever">
                                        <h5>
                                            <h2>2   </h2>
                                Leveransadress
                            </h5>
                                    </div>
                                    <div id="whatever" className="collapse" aria-labelledby="headingThree" data-parent="#paymentaccordion">
                                        <div className="card-body">
                                            <Formik
                                                initialValues={{ firstName: '', lastName: '', address1: '', address2: '', email: localStorage.getItem('accessToken') ? request.getProfile().email : '', phoneNumber: '', zipCode: '', city: '' }}
                                                validationSchema={orderFormAddressSchema}
                                                onSubmit={values => {
                                                    handleOrderSubmit(values);
                                                }}
                                            >
                                                {({ errors, touched, isSubmitting }) => (
                                                    <>
                                                        <div className="printorderform addressform">
                                                            <Form id="contactform" disabled={isSubmitting}>
                                                                <div className="form-group2 d-flex justify-content-between">
                                                                    <div className="mr-2 w-100">
                                                                        <p className="grey">Förnamn</p>
                                                                        <Field className="input" type="text" name="firstName" />
                                                                        {errors.firstName && touched.firstName ? (
                                                                            <div className="error">
                                                                                {errors.firstName}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className=" w-100">
                                                                        <p className="grey">Efternamn</p>
                                                                        <Field className="input" type="text" name="lastName" />
                                                                        {errors.firstName && touched.firstName ? (
                                                                            <div className="error">
                                                                                {errors.firstName}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group2 d-flex justify-content-between">
                                                                    <div className="mr-2 w-100">
                                                                        <p className="grey">Adressrad 1 </p>
                                                                        <Field className="input" type="text" name="address1" />
                                                                        {errors.address1 && touched.address1 ? (
                                                                            <div className="error">
                                                                                {errors.address1}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className=" w-100">
                                                                        <p className="grey">Adressrad 2 </p>
                                                                        <Field className="input" type="text" name="address2" />
                                                                        {errors.address2 && touched.address2 ? (
                                                                            <div className="error">
                                                                                {errors.address2}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group2 d-flex justify-content-between">
                                                                    <div className="mr-2 w-100">
                                                                        <p className="grey">Postnummer </p>
                                                                        <Field className="input" type="text" name="zipCode" />
                                                                        {errors.zipCode && touched.zipCode ? (
                                                                            <div className="error">
                                                                                {errors.zipCode}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className=" w-100">
                                                                        <p className="grey">Stad </p>
                                                                        <Field className="input" type="text" name="city" />
                                                                        {errors.city && touched.city ? (
                                                                            <div className="error">
                                                                                {errors.city}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group2 d-flex justify-content-between">
                                                                    <div className="mr-2 w-100">
                                                                        <p className="grey">Telefonummer </p>
                                                                        <Field className="input" type="text" name="phoneNumber" />
                                                                        {errors.phoneNumber && touched.phoneNumber ? (
                                                                            <div className="error">
                                                                                {errors.phoneNumber}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className=" w-100">
                                                                        <p className="grey">E-post </p>
                                                                        <Field className="input" type="email" name="email" />
                                                                        {errors.email && touched.email ? (
                                                                            <div className="error">
                                                                                {errors.email}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <button type="submit" className="btn btnstyle3 d-block mx-auto mb-2">Confirm</button>
                                                            </Form>
                                                        </div>
                                                    </>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header shadow-sm" id="headingTwo" data-toggle="collapse" data-target="#paymentdetailaccord" aria-expanded="false" aria-controls="paymentdetailaccord">
                                        <h5>
                                            <h2>3</h2>
                            Betalning
                            </h5>
                                    </div>
                                    <div id="paymentdetailaccord" className="collapse" aria-labelledby="headingTwo" data-parent="#paymentaccordion">
                                        <div className="card-body">
                                            <Formik
                                                initialValues={{ email: '' }}
                                                validate={values => {
                                                    const errors = {};
                                                    if (!values.email) {
                                                        errors.email = 'Email required';
                                                    } else if (
                                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                    ) {
                                                        errors.email = 'Invalid email address';
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
                                                    <div className="printorderform">
                                                        <h5>Pay with</h5>
                                                        <p><input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option3" checked /> Swish</p>
                                                        <div className="container">
                                                            <div className="row ">
                                                                <div className="col-md-6">
                                                                    <Form id="contactform" method="post">

                                                                        <div className="form-group2">
                                                                            <p className="grey">Cardholder’s Name</p>
                                                                            <Field className="input" type="text" name="name" />
                                                                            <ErrorMessage name="name" className="error" component="div" />
                                                                        </div>
                                                                        <div className="form-group2">
                                                                            <p className="grey">Card Number</p>
                                                                            <Field className="input" type="text" name="cn" />
                                                                            <ErrorMessage name="cn" className="error" component="div" />
                                                                        </div>
                                                                        <div className="form-group2 d-flex justify-content-between">
                                                                            <div className="expire">
                                                                                <p className="grey">Expiry Date</p>
                                                                                <Field className="input" type="text" name="ed" />
                                                                                <ErrorMessage name="ed" className="error" component="div" />
                                                                            </div>
                                                                            <div className="cvv">
                                                                                <p className="grey">CVV</p>
                                                                                <Field className="input" type="text" name="cvv" />
                                                                                <ErrorMessage name="cvv" className="error" component="div" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group2">
                                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                                            <small className="form-check-label grey" htmlFor="exampleCheck1">Jag godkanner diggitArt.com's <NavLink data-dismiss="modal" onClick={(e) => { e.preventDefault(); window.location.href = './terms-and-condition'; }}>Integritetspolicy</NavLink> (hantering av persondata) samt Villkor.</small>
                                                                        </div>
                                                                        <button type="submit" className="btn btnstyle3 d-block mx-auto mb-2">Confirm</button>
                                                                    </Form>
                                                                </div>
                                                                <div className="col-md-6">

                                                                    <img className="img-fluid" src={require('../../assets/images/swish.png')} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p><input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option4" /> Debit Cards</p>
                                                        <div className="d-none">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <Form id="contactform" method="post">

                                                                            <div className="form-group2">
                                                                                <p className="grey">Cardholder’s Name</p>
                                                                                <Field className="input" type="text" name="name" />
                                                                                <ErrorMessage name="name" className="error" component="div" />
                                                                            </div>
                                                                            <div className="form-group2">
                                                                                <p className="grey">Card Number</p>
                                                                                <Field className="input" type="text" name="cn" />
                                                                                <ErrorMessage name="cn" className="error" component="div" />
                                                                            </div>
                                                                            <div className="form-group2 d-flex justify-content-between">
                                                                                <div className="expire">
                                                                                    <p className="grey">Expiry Date</p>
                                                                                    <Field className="input" type="text" name="ed" />
                                                                                    <ErrorMessage name="ed" className="error" component="div" />
                                                                                </div>
                                                                                <div className="cvv">
                                                                                    <p className="grey">CVV</p>
                                                                                    <Field className="input" type="text" name="cvv" />
                                                                                    <ErrorMessage name="cvv" className="error" component="div" />
                                                                                </div>
                                                                            </div>
                                                                            <button type="submit" className="btn btnstyle3 d-block mx-auto mb-2">Confirm</button>
                                                                        </Form>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <img className="img-fluid" src={require('../../assets/images/debit.png')} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p><input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option4" /> Pay on Delivery</p>
                                                    </div>


                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default withRouter(Modals);
