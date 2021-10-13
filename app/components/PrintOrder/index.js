/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { createRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
// import CanvasDraw from "react-canvas-draw";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { toast } from 'react-toastify';
import watermark from 'watermarkjs';
import "../../assets/css/myprint.css";
import edit from '../../assets/icons/edit.svg';
import card from '../../assets/images/card.svg';
import email from '../../assets/images/email.svg';
import move from '../../assets/images/move.svg';
import swish from '../../assets/images/swish.svg';
import request from '../../utils/request';
import klarna from '../../assets/images/klarna.png';
import { getProduct, createSession, createOrder, sizes, colors } from "./api";
import { createKlarnaPaymentOrder } from "../../common/api"
import KlarnaPaymentWidget from "../../common/klarnaPaymentWidget"
import PaymentButton from "./paymentButton";
import BillingForm from "./billingForm";

const FormFieldContent = {
  FIRSTNAME: {
    title: 'FIRST NAME',
    field: 'firstName',
  },
  LASTNAME: {
    title: 'LAST NAME',
    field: 'lastName',
  },
  EPOST: {
    title: 'EPOST',
    field: 'epost',
  },
  ADDRESS1: {
    title: 'ADDRESS1',
    field: 'address1',
  },
  ADDRESS2: {
    title: 'ADDRESS2',
    field: 'address2',
  },
  POSTNUMBER: {
    title: 'POSTNUMBER',
    field: 'postNumber',
  },
  STAD: {
    title: 'STAD',
    field: 'stad',
  },
  TELEFONUMER: {
    title: 'TELEFONUMER',
    field: 'telefonummer',
  },
  NOTERA: {
    title: 'NOTERA',
    field: 'notera',
  },
};

const TAKE_FROM_KLARNA = "TAKE_FROM_KLARNA"; // this field use from klarna billing address
const PAYMENT_INTERVAL_TIME = 10000; // 10 seconds
const MAX_PAYMENT_STATUS_CHECK = 12; // until 2 minutes

class PrintOrder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showPaymentCredit: true,
      showPaymentCreditSwish: false,
      prices: [],
      price: {},
      number: 1,
      scale: 0.6,
      rotation: 0,
      diwth: 300,
      width: 300,
      height: 300,
      qty: 1,
      signatureImg: '',
      cost: 540,
      totallier: 540,
      shipping: 0,
      A4Selected: true,
      A3Selected: false,
      ingarSelected: true,
      hundredKrSelected: false,
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      postNumber: '',
      stad: '',
      telefonummer: '',
      epost: '',
      notera: '',
      paymentType: '',
      isLoadingPayment: false,
      status:false,
      WidgetLoaded: false,
      order_id:'',
      swishLink: '',
      isPaymentLoader: false,
      device: null,
      paymentUrl: null,
      payerAlias: '',
      isPayerAliasModal: false,
      isPaymentStatusLoader: false,
      klarnaWidgetContent: '',
      termsChecked: true
    }
    this.canvas = null;
    this.editorRef = createRef();
    this.canvasSignatureRef = createRef();

  }

  componentDidMount = async () => {
    window.addEventListener("resize", this.updateWidth)
    this.updateWidth();
    request.getPublic('users/getAllPrices')
      .then(response => {
        this.setState({
          price: response && response.data.prices
        });

      }).catch(error => {
        toast.error(error.response.data.msg);
      });

        console.log(this.canvasSignatureRef.current)

    this.canvas = new fabric.Canvas(document.getElementById('signature-canvas'), {
      backgroundColor: "transparent",
    });
    const commonBrushConfig = {
      opacity: 0.5,
      color: '#000'
    };
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas, commonBrushConfig);
    this.canvas.freeDrawingBrush.width = 3;
    this.canvas.freeDrawingBrush.color = '#000';
    this.canvas.isDrawingMode = true;

    this.setState({
      savedDrawing: localStorage.getItem("savedDrawing")
    });

    const device = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(device)) {
      this.setState({device: 'tablet'});
    }else if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(device) ) {
      this.setState({device: 'mobile'});
    } else {
      this.setState({device: 'desktop'});
    }
  }
  pay = async () => {

   this.setState({
              status:true
            })


  }
  authorize = () => {
    const Klarna = window.Klarna;
    Klarna.Payments.authorize(
      {
        payment_method_category: "pay_later",
        auto_finalize: true
      },
      ({ authorization_token }) => {
        console.log(authorization_token);
        createOrder({
          authorization_token,
          order_lines: ''
        }).then(response => {
          console.log(response);
          this.setState({
            order_id: response.data.order_id,
          });
          if(response.data.fraud_status==="ACCEPTED"){
            this.setState({
              status:'completed'
            })
          }
        })

        // setOrderId(response.data.order_id);
        // setStatus("completed");
      }
    );

  }

  handlePaymentLoader = (isLoadingPayment = false) => {
    this.setState({ isLoadingPayment });
  }

  /* const PrintOrder = (props) => {
     const [showPaymentCredit, setshowPaymentCredit] = useState(true);
    const [showPaymentCreditSwish, setshowPaymentCreditSwish] = useState(false);
    const [prices, setPrices] = useState([]);
    const [price, setPrice] = useState({});
    const [number, setNumber] = useState(1);
    const [scale, setScale] = useState(0.6);
    const [rotation, setRotation] = useState(0);
    const [diwth, setDiwth] = useState(300);
    const [height, setHeight] = useState(300);
    const [qty, setQuantity] = useState(1);
    const [signatureImg, setSignature] = useState();

    const editorRef = useRef(null);

    useEffect(() => {
      window.addEventListener("resize", updateWidth)
      updateWidth();
      request.getPublic('users/getAllPrices')
        .then(response => {
          setPrices(response && response.data.prices);

        }).catch(error => {
          toast.error(error.response.data.msg);
        });

      /*       const script = document.createElement('script');

            script.src = "./scrollToTop.js";
            script.async = true;

            document.body.appendChild(script);


    }, []); */

  increaseQty = () => {
    // setQuantity(qty + 1);
    if (this.state.qty >= 3) {
      return;
    }

    this.setState({
      qty: this.state.qty + 1
    }, () => { this.updateCost() })
  }

  decreaseQty = () => {
    if (this.state.qty <= 1) return
    // setQuantity(qty - 1);
    this.setState({
      qty: this.state.qty - 1
    }, () => { this.updateCost() })
  }


  goBackToLink = () => {
    this.props.history.push(localStorage.getItem("backURL"));
  }


  updateWidth = () => {
    const element = document.getElementById('reference');
    const width = element.offsetWidth;
    const height = (width - 30) / 1.414;
    this.setState({
      diwth: width - 30,
      width: width - 30,
      height
    })

    console.log(`Width: ${this.state.diwth - 30}`);
    console.log(`Height: ${this.state.height}`);
    console.log(`Ratio: ${(this.state.diwth - 30) / this.state.height}`);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
  }

  handleOrderSubmit = async (paymentId = "", values = {}) => {
    const u = localStorage.getItem('accessToken') ? request.getProfile().id : null;
    const format = this.state.A4Selected ? "A4" : "A3";
    const {
      firstName,
      lastName,
      address1,
      address2,
      postNumber,
      stad,
      cost,
      telefonummer,
      qty,
      epost,
      notera,
      paymentType
    } = this.state;

    try {
      const finalImage = await this.attachSignature(this.state.savedDrawing);
      const requestBody = {
        firstName, lastName, email: epost, phoneNumber: telefonummer, city: stad, format, image: finalImage,
        zipCode: postNumber, address1, address2, price: cost, quantity: qty, notera, user: u,
        ...values,
        paymentProvider: paymentType,
        paymentId
      };
      await request.postPublic('users/createOrder', requestBody).then(response => {
        const { msg } = response && response.data;
        // setTimeout(() => {
        //   toast.success("Order is created. confirm after this payment done!", { autoClose: 12000 });
        // }, 2000);
      }).catch(error => {
        console.log(">>>>>>>>>>>>>error", error);
        toast.error('Something went wrong!' + error);
        return false;
      });
      return true;
    } catch(e) {
      console.log(">>e>>>>>", e);
      toast.error('Your order not placed');
      return;
    }

    /* const p = price && price.price ? price.price * number : null;
    const f = price && price.format ? price.format : null;
    const q = number;
    let f = "A4";
    let adjustedImg;
    if (this.editorRef.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editorRef.current.getImage();
      adjustedImg = canvas.toDataURL();
      const finalImage = await this.attachSignature(adjustedImg);
      console.log(finalImage);
    }
    request.postPublic('users/createOrder', {
      firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, phoneNumber: this.state.telefonummer,
      city: this.state.stad, zipCode: this.state.postNumber, address1: this.state.address1, address2: this.state.address2, price: this.state.cost,
      format: f, image: finalImage, quantity: this.state.qty, user: u
    })
      .then(response => {
        const { msg } = response && response.data;
        toast.success(msg);
        localStorage.getItem('accessToken') ? props.history.push('/myorders') : props.history.push('/kidsdrawing');
      }).catch(error => {
        toast.error('Something went wrong!');
      })*/
  }

  setPayerAlias = (event) => {
    const payerAlias = event.target.value;
    this.setState({ payerAlias });
  }

  openPayerAliasModal = async () => {
    const { device, paymentType } = this.state;
    const isDesktop = device === "desktop";
    if (paymentType === "swish") {
      if (isDesktop) {
        this.setState({ isPayerAliasModal: true, payerAlias: '', paymentUrl: '' });
      } else {
        await this.handlePayment();
      }

      return;
    } else if (paymentType === "klarna") {
      await this.handleKlarnaPayment();
    }
  }

  closePayerAliasModal = () => {
    this.setState({
      isPayerAliasModal: false,
      payerAlias: ''
    });
  }

  handleSubmitSwish = async event => {
    event.preventDefault();
    await this.handlePayment();
  }

  handlePayment = async () => {
    // const { price, number } = this.state
    // const p = price && price.price ? price.price * number : null;
    // const f = price && price.format ? price.format : null;
    // const q = number;

    const { paymentType, totallier, isPayerAliasModal, device, qty } = this.state;
    const isDesktop = device === "desktop";
    let { payerAlias } = this.state;

    if (paymentType !== 'swish') {
      toast.error('Select swish payment type', { autoClose: 5000 });
      return;
    }

    let body = {};
    if (isDesktop) {
      if (!isPayerAliasModal) {
        toast.error('Enter valid swish number', { autoClose: 5000 });
        return;
      }
      const numbers = /^[0-9]+$/;
      if (!payerAlias || payerAlias.length < 8 || !payerAlias.match(numbers)) {
        toast.error('Enter valid swish number', { autoClose: 5000 });
        return;
      }
      const has46 = /^46/;
      payerAlias = payerAlias.replace(/^0/, ''); // remove first zero
      if (!payerAlias.match(has46)) {
        payerAlias = `46${payerAlias}`;
      }

      body = { payerAlias };
    }



    const user = localStorage.getItem('accessToken') ? request.getProfile().id : null;
    if (totallier > 0) {
      this.setState({ isPaymentLoader: true, swishLink: '' });
      await request.postPublic('payment/requests', {
        // amount: totallier,
        amount: 5,
        qty,
        message: "Payment request",
        user,
        ...body
      })
        .then(async response => {
          const {data} = response;
          if (!data.id) {
            throw new Error("");
          }

          await this.handleOrderSubmit(data.id);
          console.log(">>>>", window.location.origin);
          const cbUrl = `${window.location.origin}/order/payment-status/${data.id}`;
          console.log(">>cbLink>>", cbUrl, data);
          const swishLink = `swish://paymentrequest?token=${data.token}&callbackurl=${cbUrl}`;
          if (isDesktop) {
            await this.setPaymentStatusInterval(data.id);
          }

          if(this.state.device !== "desktop" && this.state.device !== null ){
            window.location = swishLink;
          } else {
            await request.postPublic(`paymentUrl`, {
              oldUrl: swishLink
            })
            .then(response => {
              this.setState({
                paymentUrl: `https://diggiart.com/paymentlink/${response.data.data.newUrl}`
              })
            }).catch(error => {
              toast.error("Error occured! Payment link cannot be generated", { autoClose: 5000 });
            });
          }
          this.setState({
            isPaymentLoader: false,
            swishLink
          });
          if (!isDesktop) {
            this.closePayerAliasModal();
          }
        }).catch(error => {
          console.log(">>error>>", error.response);
          let isInvalidSwishNum = false;
          if (error.response && error.response.data) {
            const res = error.response.data;
            if (Array.isArray(res)) {
              isInvalidSwishNum = res.some(i => i.errorCode === "ACMT03");
            }
          }

          if (isInvalidSwishNum) {
            toast.error('Swish-nummer är inte giltigt', { autoClose: 5000 });
          } else {
            toast.error('Something went wrong!', { autoClose: 5000 });
            this.closePayerAliasModal();
          }

          this.setState({
            isPaymentLoader: false,
            swishLink: ''
          });
        });
    }
  }

  setPaymentStatusInterval = async (paymentRequestId) => {
    clearInterval(this.paymentTimer);
    clearTimeout(this.showTimer);

    this.maxPaymentStatusCheck = MAX_PAYMENT_STATUS_CHECK;
    this.setPaymentStatus(true);
    const twoMinutes = 60 * 2;
    const display = document.querySelector('#swish_status_timer');
    this.startTimer(twoMinutes, display);
    this.paymentTimer = setInterval(() => {
      this.maxPaymentStatusCheck -= 1;
      this.paymentStatusWorker(paymentRequestId, this.maxPaymentStatusCheck);
    }, PAYMENT_INTERVAL_TIME);
  }

  startTimer = (duration, display) => {
    var timer = duration, minutes, seconds;
    this.showTimer = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          timer = duration;
        }
    }, 1000);
  }


  clearTimer = () => {
    this.closePayerAliasModal();
    clearInterval(this.paymentTimer);
    clearTimeout(this.showTimer);
    this.setPaymentStatus(false);
  }

  setPaymentStatus = (isPaymentStatusLoader = false) => {
    this.setState({ isPaymentStatusLoader });
  }

  paymentStatusWorker = async (paymentRequestId, attempt = 0) => {
    if(!paymentRequestId) {
      return;
    }
    const checkStatusUrl = `payment/request-callback/${paymentRequestId}`;
    const isLastTry = !attempt && attempt <= 0;
    this.setPaymentStatus(true);
    return await request.getPublic(checkStatusUrl).then(response => {
        const {data} = response;
        if (data.status === "PAID") {
          const cbUrl = `${window.location.origin}/order/payment-status/${paymentRequestId}`;
          toast.success('Betalning har genomförts!', { autoClose: 5000 });
          window.location = cbUrl;
        } else if (isLastTry) {
          toast.error('Betalning misslyckades', { autoClose: 5000 });
        }
        if (isLastTry) {
          this.setPaymentStatus(false);
          this.clearTimer();
        }
      }).catch(error => {
        if (isLastTry) {
          toast.error('Betalning misslyckades', { autoClose: 5000 });
          this.setPaymentStatus(false);
          this.clearTimer();
        }
      });
  }

  setScale = (value) => {
    this.setState({ scale: value });
  }

  zoomImage = (value) => {
    // e.preventDefault();
    // if (e.deltaY < 0) {
    //     setScale(scale + 0.3);
    // }
    // if (e.deltaY > 0 && scale > 1) {
    //     setScale(scale - 0.3);
    // }
  }

  rotateImage = () => {
    // setRotation(rotation === 360 ? 0 : rotation + 90)
    console.log(`prevRotation: ${this.state.rotation}`);
    console.log(`prevRotation: ${  this.state.rotation}`);
    this.setState(prevState => ({
      rotation: prevState.rotation === 360 ? 90 : prevState.rotation + 90
    }))
  }
  // const goBackTo = () => {
  //   setgoBackTo(localStorage.getItem("niMtoto") === true ? "/kidsdrawing" :"/professionaldrawing")
  // }

  clearSignature = () => {
    this.canvas.clear();
  }

  resizeSignature = async () => {
    const signatureWidth = 50;
    const signatureHeight = 30;
    const resizedCanvas = document.createElement("canvas"); // create canvas for resize
    const resizedContext = resizedCanvas.getContext("2d"); // set size
    resizedCanvas.width = signatureWidth;
    resizedCanvas.height = signatureHeight;

    const canvas = document.getElementById("signature-canvas"); // Original signature canvas
    resizedContext.drawImage(canvas, 0, 0, signatureWidth, signatureHeight); // 50 X 30
    return await resizedCanvas.toDataURL();
  }


  attachSignature = async () => {
    const options = {
      init(img) {
        img.crossOrigin = 'anonymous'
      }
    };

    let finalImg = '';
    const signatureImage = await this.resizeSignature();

    await watermark([localStorage.getItem("savedDrawing"), signatureImage], options)
      .image(watermark.image.lowerRight())
      .then(img => {
        // this.setState({
        //   savedDrawing: img.src
        // }); // Set signature to checkout
        finalImg = img.src; // width signature image
        // localStorage.setItem("savedDrawing", img.src);
      });

    return finalImg
  }

  saveSignature = () => {
    this.setState({ signatureImg: this.canvas.toDataURL() })
  }


  updateCost = () => {
    this.setState({
      totallier: this.state.cost * this.state.qty + this.state.shipping,
    })
  }

  onA4Selected = () => {
    this.setState({
      A4Selected: true,
      A3Selected: false,
      cost: 540
    }, () => { this.updateCost() })
  }


  onA3Selected = () => {
    this.setState({
      A3Selected: true,
      A4Selected: false,
      cost: 720
    }, () => { this.updateCost() })
  }

  onIngarSelected = () => {

    this.setState({
      shipping: 0,
      hundredKrSelected: false,
      ingarSelected: true,
    }, () => { this.updateCost() })
  }

  on100KrSelected = () => {
    this.setState({
      shipping: 100,
      hundredKrSelected: true,
      ingarSelected: false,
    }, () => { this.updateCost() })
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlePaymentTypeSelect = (event) => {
    const paymentType = event.target.value;
    this.setState({ paymentType });
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  handleKlarnaPayment = async () => {
    const { paymentType, qty = 1, totallier } = this.state;
    if (paymentType !== "klarna" || totallier <= 0) {
      return;
    }
    this.setState({ isPaymentLoader: true, klarnaWidgetContent: '' });
    const { status, data } = await createKlarnaPaymentOrder({
      amount: totallier,
      qty,
      reference: "drawing-13-321",
      name: "drawing-sign"
    }).catch(() => {
      toast.error('Betalning misslyckades', { autoClose: 5000 });
      this.setState({ isPaymentLoader: false, klarnaWidgetContent: '' });
      return;
    });
    if (status !== 201 || !data.html_snippet || !data.order_id) {
      toast.error('Betalning misslyckades', { autoClose: 5000 });
      return;
    }
    await this.handleOrderSubmit(data.order_id, {
      city: TAKE_FROM_KLARNA,
      email: TAKE_FROM_KLARNA,
      phoneNumber: TAKE_FROM_KLARNA,
      zipCode: TAKE_FROM_KLARNA,
      address1: TAKE_FROM_KLARNA,
      firstName: TAKE_FROM_KLARNA,
      lastName: TAKE_FROM_KLARNA
    });
    window.localStorage.setItem("order_id", data.order_id);
    this.setState({ isPaymentLoader: false, klarnaWidgetContent: data.html_snippet });
    console.log(">>>>", data);
  }

  setKlarnaWidgetContent = (klarnaWidgetContent = '') => {
    this.setState({ klarnaWidgetContent });
  }

  handleTermsChecked = () => {
    this.setState({ termsChecked: !this.state.termsChecked });
  }

  render() {

    const {
      FIRSTNAME,
      LASTNAME,
      EPOST,
      ADDRESS1,
      ADDRESS2,
      POSTNUMBER,
      STAD,
      TELEFONUMER,
      NOTERA,
    } = FormFieldContent;

    const {
      paymentType,
      isLoadingPayment,
      rotation,
      height,
      diwth,
      isPaymentLoader,
      swishLink,
      paymentUrl,
      device,
      isPayerAliasModal,
      payerAlias,
      isPaymentStatusLoader,
      klarnaWidgetContent,
      totallier
    } = this.state;

    return (
      <React.Fragment>
        <div
          className="my-print-page container-fluid" id="printModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
            {
              klarnaWidgetContent &&
              <KlarnaPaymentWidget
                content={klarnaWidgetContent}
                onClose={this.setKlarnaWidgetContent}
              />
            }
            {
              isLoadingPayment && <div className="loaderOverlay">
                <div className="loader">Loading...</div>
              </div>
            }
          <div className="my-modal" role="document">
            <div className="p-0">
              <div className="border-left border-top border-right py-2 px-1 d-flex align-items-center">
                <button onClick={this.props.hidePrintPage} type="button" className="btn btn-outline-danger py-0 mr-3">
                  Tillbaka
                </button>
                <h5 className="modal-title text-center m-auto" id="exampleModalLabel">Skicka till tryck</h5>

                <button type="button" className="close" data-dismiss="modal" aria-label="Close">

                </button>
              </div>


              <div className="">
                <h2 className="mb-0 block_title">
                  Välj storlek
                </h2>
                <div id="collapseOne" className="show border-left border-bottom border-right" aria-labelledby="headingOne">
                  <div className="card-body p-0 py-3">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-6" id="reference" style={{ height: "100%" }}>
                          <AvatarEditor
                            ref={this.editorRef}
                            image={this.state.savedDrawing}
                            scale={this.state.scale}
                            // width={(rotation === 90 || rotation === 270) ? 300 : 400}

                            height={(rotation == 0 || rotation == 180 || rotation == 360) ? height : (rotation == 90 || rotation == 270) ? diwth : height}
                            //width={diwth - 30}
                            width={(rotation == 0 || rotation == 180 || rotation == 360) ? diwth : (rotation == 90 || rotation == 270) ? height : diwth}

                            height={(this.state.rotation == 0 || this.state.rotation == 180 || this.state.rotation == 360) ? this.state.height : (this.state.rotation == 90 || this.state.rotation == 270) ? this.state.diwth : this.state.height}
                            // width={diwth - 30}
                            width={(this.state.rotation == 0 || this.state.rotation == 180 || this.state.rotation == 360) ? this.state.diwth : (this.state.rotation == 90 || this.state.rotation == 270) ? this.state.height : this.state.diwth}

                            /* height={(rotation == 0 || rotation == 180 || rotation == 360) ? (window.innerWidth > 768) ? height : 300 : (rotation == 90 || rotation == 270) ? diwth : (window.innerWidth > 768) ? height : 300}
                            //width={diwth - 30}
                            width={(rotation == 0 || rotation == 180 || rotation == 360) ? diwth : (rotation == 90 || rotation == 270) ? (window.innerWidth > 768) ? height : 300 : diwth} */
                            rotate={this.state.rotation}
                            border={2}
                          />
                          {
                            this.state.signatureImg
                            &&
                            <div
                              style={{
                                position: 'absolute',
                                bottom: `5px`,
                                right: '15px'
                              }}
                            >
                              <img src={this.state.signatureImg} alt="" style={this.state.width > 500 ? { maxWidth: '65px'} : { maxWidth: '45px' }} />
                            </div>
                          }
                        </div>
                        <div className="col-md-6 ">
                          {
                            window.innerWidth <= 768 ?
                              <>
                                <div className="col-md-12 p-0 pt-3">
                                  Valfri: <span className="text-muted ml-1">placera din målning som du vill ha det på det färdiga trycket</span>
                                </div>
                                <div className="p-3 row">
                                  <div className="row col-md-6 d-flex flex-row justify-content-left align-items-center">
                                    <img
                                      title="Rotate"
                                      alt="Rotate"
                                      width={42}
                                      className="img-fluid"
                                      onClick={this.rotateImage}
                                      src={require('../../assets/images/update-arrow.png')}
                                    />

                                    <img className="move0mIcon" src={move} alt="" width="42px" height="42px"></img>
                                  </div>
                                  <div className="col-md-6 mt-3">
                                    <div className="row align-items-center slidecontainer">
                                      <label htmlFor="customRange1">Zooma:</label>
                                      <div className="slider">
                                        <Slider
                                          min={0.4}
                                          max={1.8}
                                          step={0.1}
                                          value={this.state.scale}
                                          class="custom-range"
                                          onChange={value => this.setState({ scale: Number(value).toFixed(1) })}
                                        />
                                      </div>
                                    </div>

                                    <div className="row mt-4 d-flex align-items-center">
                                      <span>Signering:</span> <button className="ml-2 btn btn-outline-success" data-toggle="modal" data-target="#signatureModal">Signera din konst?</button>
                                    </div>
                                  </div>
                                </div>

                                <div className="card p-3">
                                  <div className="d-flex flex-row justify-content-between">
                                    <label className="radio radio-before">
                                      <span className="radio__input">

                                        <input type="radio" name="radiosize" value="720" checked={this.state.A3Selected} onClick={() => this.onA3Selected()}></input>

                                        {/* <input type="radio" name="radiosize" value="3"></input> */}

                                        <span className="radio__control"></span>
                                      </span>
                                      <span className="radio__label">A3 29,7 x 42 cm</span>
                                    </label>
                                    <span>720 kr</span>
                                  </div>
                                </div>
                                <div className="card  p-3 mt-2">
                                  <div className="d-flex flex-row justify-content-between">
                                    <label className="radio radio-before">
                                      <span className="radio__input">

                                        <input type="radio" name="radiosize" value="540" checked={this.state.A4Selected} onClick={() => this.onA4Selected()}></input>

                                        <span className="radio__control"></span>
                                      </span>
                                      <span className="radio__label">A4 21 x 29,7 cm</span>
                                    </label>
                                    <span>540 kr</span>
                                  </div>
                                </div>

                              </>
                              :
                              <>
                                <div className="card p-3">
                                  <div className="d-flex flex-row justify-content-between">
                                    <label className="radio radio-before">
                                      <span className="radio__input">
                                        <input type="radio" name="radiosize" value="720" id="a3Radio" checked={this.state.A3Selected} onClick={() => this.onA3Selected()}></input>
                                        <span className="radio__control"></span>
                                      </span>
                                      <span className="radio__label">A3 29,7 x 42 cm</span>
                                    </label>
                                    <span>720 kr</span>
                                  </div>
                                </div>
                                <div className="card  p-3 mt-2">
                                  <div className="d-flex flex-row justify-content-between">
                                    <label className="radio radio-before">
                                      <span className="radio__input">

                                        <input type="radio" name="radiosize" value="540" checked={this.state.A4Selected} onClick={() => this.onA4Selected()}></input>


                                        <span className="radio__control"></span>
                                      </span>
                                      <span className="radio__label">A4 21 x 29,7 cm</span>
                                    </label>
                                    <span>540 kr</span>
                                  </div>
                                </div>

                                <div className="col-md-12 p-0 pt-3">
                                  Valfri: <span className="text-muted ml-1">placera din målning som du vill ha det på det färdiga trycket</span>
                                </div>
                                <div className="p-3 row">
                                  <div className="row col-md-6 d-flex flex-row justify-content-left align-items-center">
                                    <img
                                      title="Rotate"
                                      alt="Rotate"
                                      width={42}
                                      className="img-fluid"
                                      onClick={this.rotateImage}
                                      src={require('../../assets/images/update-arrow.png')}
                                    />

                                    <img className="move0mIcon ml-3" src={move} alt="" width="42px" height="42px"></img>
                                  </div>
                                  <div className="col-md-6 mt-3">
                                    <div className="row align-items-center slidecontainer">
                                      <label htmlFor="customRange1">Zooma:</label>
                                      <div className="slider">
                                        <Slider
                                          min={0.4}
                                          max={1.8}
                                          step={0.1}
                                          value={this.state.scale}
                                          class="custom-range"
                                          onChange={value => this.setState({ scale: Number(value).toFixed(1) })}
                                        />
                                      </div>
                                    </div>

                                    <div className="row mt-4 d-flex align-items-center">
                                      <span>Signering:</span> <button className="ml-2 btn btn-outline-success" data-toggle="modal" data-target="#signatureModal">Signera din konst?</button>
                                    </div>
                                  </div>
                                </div>
                              </>
                          }
                          <table className="table border-right border-left border-bottom mt-1">
                            <thead className="bg-mine-blue">
                              <tr>
                                <th className="my-no-border " colSpan="3" scope="col">Sammanfattning</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th colSpan={2} className="align-middle">Produkt:</th>
                                <td colSpan={1}>Diggiart canvas</td>
                              </tr>

                              <tr>
                                <th className="align-middle" >Frakt:</th>
                                <td>
                                  <label className="radio radio-before">
                                    <span className="radio__input">

                                      <input type="radio" name="radioF" value="0" checked={this.state.ingarSelected} onClick={() => this.onIngarSelected()}></input>

                                      {/* <input type="radio" name="radioF" value="1" checked></input> */}

                                      <span className="radio__control"></span>
                                    </span>
                                    <span className="radio__label">Ingår</span>
                                  </label>
                                    Närmaste ombud
                                </td>
                                <td className="align-middle">
                                  <label className="radio radio-before">
                                    <span className="radio__input">

                                      <input type="radio" name="radioF" value="100" checked={this.state.hundredKrSelected} onClick={() => this.on100KrSelected()}></input>

                                      {/* <input type="radio" name="radioF" value="1"></input> */}

                                      <span className="radio__control"></span>
                                    </span>
                                    <span className="radio__label">100 Kr</span>
                                  </label>
                                  Hemleverans
                                </td>
                              </tr>

                              <tr>
                                <th className="align-middle" style={{minWidth: "72px" }}>Antal:</th>
                                <td className="align-middle"><div className="col-lg-6 col-md-8">
                                  {/* <input type="number" className="my-number" id="inputAddress2" placeholder=" required0" value="1"></input> */}
                                  <div className="input-group i_group align-items-center">

                                    <input type="number" className="my-number" min="1" max={3} id="spinner" name="quantity" value={this.state.qty} />

                                    <div className="add_item_btn">
                                      <button className="up_btn" onClick={this.increaseQty}>&#8963;</button>
                                      <button className="down_btn" onClick={this.decreaseQty}>&#8964;</button>
                                    </div>
                                  </div>

                                </div>
                                </td>
                                <td></td>
                              </tr>
                              <th className="align-right" colSpan="2">Totalsumma:</th>
                              <th className="text-success font-weight-bold-mine">
                                <span className=" float-right">{totallier} Kr</span></th>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-0 block_title">
                  Betalning
                </h2>
                <div id="collapseThree" className="border-left border-bottom border-right" aria-labelledby="headingThree">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="card col-md-8 p-0 mt-3">
                        <div className="card-header bg-mine-blue">
                          <strong>Betala med</strong>
                        </div>
                        <div className="card-body payment_type_table">
                          <table className="table">
                            <tr>
                              <th className="py-0" style={{ verticalAlign: "middle" }}>
                                <label className="radio radio-before">
                                  <span className="radio__input">
                                    <input
                                      type="radio"
                                      name="payment"
                                      value="swish"
                                      onChange={this.handlePaymentTypeSelect}
                                      checked={paymentType === "swish"}
                                    />

                                    <span className="radio__control"></span>
                                  </span>
                                  <span className="radio__label">Swish</span>
                                </label>
                              </th>
                              <td className="p-0">
                                <img src={swish} alt="invoice"></img>
                              </td>

                            </tr>

                            <tr>
                              <th className="py-0" onClick={this.pay} style={{ verticalAlign: "middle" }}>
                                <label className="radio radio-before">
                                  <span className="radio__input">

                                    <input
                                      type="radio"
                                      name="payment"
                                      value="klarna"
                                      onChange={this.handlePaymentTypeSelect}
                                      checked={paymentType === "klarna"}
                                    />

                                    <span className="radio__control"></span>
                                  </span>
                                  <span className="radio__label">Klarna</span>
                                </label>

                              </th>
                              <td className="p-0">
                                <img src={klarna} alt="invoice"></img>
                              </td>

                            </tr>
                          </table>
                        </div>
                        <div className="card-footer">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="customCheck"
                              className="print_order_terms_checkbox"
                              id="customC2"
                              checked={this.state.termsChecked}
                              onChange={this.handleTermsChecked}
                              required
                            />
                            <label className="ml-2 p-0 mb-0 small-text-on-mobile" htmlFor="customC2">Jag godkanner diggiart.com's <a href="/cookie-consent">Integritespolicy </a>(hantering av persondata) samt <a href="!#">Villkor</a>.</label>
                          </div>

                          <PaymentButton
                            totallier={totallier}
                            swishLink={swishLink}
                            device={device}
                            isPaymentLoader={isPaymentLoader}
                            paymentUrl={paymentUrl}
                            onSubmit={this.openPayerAliasModal}
                            isShow={paymentType === "klarna"}
                          />

                        </div>
                      </div>

                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </div>
              </div>

              {
                paymentType === "swish" &&
                <BillingForm
                  onChange={this.onInputChange}
                  onSubmit={this.openPayerAliasModal}
                  {...this.state}
                />
              }
            </div>
          </div>
        </div>

        <div className="modal fade" id="signatureModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Signature</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="canvas-container2 text-center">
                  <div id="canvas" className="signature-canvas-wrapper">
                    <canvas
                      ref={this.canvasSignatureRef}
                      id="signature-canvas"
                      data-paper-resize
                      style={{ width: "100%", height: "100%" }}
                      width={325}
                      height={200}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning" onClick={this.clearSignature}>Gör om</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Stäng</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveSignature}>Godkänn signatur</button>
              </div>
            </div>
          </div>
        </div>
        {
          isPayerAliasModal  && device === "desktop" &&
          <div className="modal fade show" id="payerAliasModal" tabIndex="-1" role="dialog" aria-labelledby="payerAliasModalClose" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="payerAliasModalClose">Swish-betalning</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={isPaymentStatusLoader ? () => "" : this.closePayerAliasModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={this.handleSubmitSwish}>
                  <div className="modal-body">
                    <div className="canvas-container2 text-center">
                      <div className="siwsh_input">
                        <label>
                        Ditt telefonnummer för Swish
                        </label>
                        <input
                          name="payerAlias"
                          value={payerAlias}
                          placeholder="Tex 078 1234567"
                          onChange={this.setPayerAlias}
                          autoFocus={true}
                          disabled={isPaymentStatusLoader}
                        />
                      </div>
                      {
                        (isPaymentStatusLoader) &&
                        <div className="swish_timer">
                          <div>
                            <b>Öppna din Swish-app och fortsätt till betalning.</b>
                          </div>
                          <div>
                            <b>Vänligen uppdatera inte sidan innan det är klart.</b>
                          </div>
                          <div>
                            {/* <b>Wait until</b> */}
                            <span id="swish_status_timer"></span>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={this.closePayerAliasModal}
                      disabled={isPaymentLoader || isPaymentStatusLoader}
                    >Avbryt</button>
                    <button
                      type={isPaymentStatusLoader ? "button" : "submit"}
                      className="btn
                      btn-primary"
                      data-dismiss="modal"
                      disabled={!payerAlias || isPaymentStatusLoader}
                    >
                      {isPaymentLoader ? "Loading..." : "Godkänn"}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        }
      </React.Fragment >
    );
  }
}

export default PrintOrder;
