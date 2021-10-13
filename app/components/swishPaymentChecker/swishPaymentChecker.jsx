import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import request from '../../utils/request';
import "./style.scss";

const SwishPaymentChecker = ({
  match: {
    params: {
      paymentRequestId
    } = {}
  } = {}
}) => {

  const [isLoading, setLoader] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("FAILED");
  const [order, setOrder] = useState({});

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    console.log(">>>>>paymentRequestId", paymentRequestId);
    if (!paymentRequestId) {
      return;
    }
    const checkStatusUrl = `payment/request-callback/${paymentRequestId}`;
    setLoader(true);
    await request.getPublic(checkStatusUrl).then(response => {
      const { data } = response;
      setOrder(data.order || {});
      setPaymentStatus(data.status);
      setLoader(false);
    }).catch(error => {
      toast.error('Betalning misslyckades', { autoClose: 5000 });
      setPaymentStatus("FAILED");
      setLoader(false);
    });
  }

  return (
    <div className="swish_pay_check">
      <h2 className="center-text">
        Orderdetaljer
      </h2>
      <div className="center-text container">
          {
            !paymentRequestId &&
            <div className="error">
              Ogiltig orderinformation går till
            </div>
          }
          {
            paymentStatus !== "PAID" && !isLoading &&
            <div className="error">
              Betalning misslyckades försök igen.
            </div>

          }
          {
            paymentStatus === "PAID" &&
            <div className="success">
              Beställningsplats framgångsrikt med betalning!
            </div>

          }

          {
            order._id &&
            <div className="order_details">
              <h3>Order ID: {"  "} #{order.orderId}</h3>
              <div className="img_block">
                <img src={order.image} />
              </div>

              <ul>
                <li><b>Name:</b> {"  "} {order.firstName} {" "} {order.lastName} </li>
                <li><b>E-post:</b> {"  "} {order.email} </li>
                <li><b>Telefonummer:</b> {"  "} {order.phoneNumber} </li>
                {
                  order.zipCode &&
                  <li><b>Postnummer:</b> {"  "} {order.zipCode} </li>
                }
                <li><b>Payment type:</b> {"  "} {order.paymentProvider} </li>
                <li><b>Payment reference id:</b> {"  "} {order.paymentId} </li>
                <li><b>Payment status:</b> {"  "} {paymentStatus === "PAID" ? "PAID" : "FAILED"} </li>
              </ul>
            </div>
          }
          {
            isLoading && <h3 className="loader">Loading...</h3>
          }

          {
            !isLoading &&
            <div className="home_link">
              <Link to="/">Go to Home</Link>
            </div>
          }
      </div>
    </div>
  )
}

export default SwishPaymentChecker;
