import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import PaymentWidget from "../../common/klarnaPaymentWidget";
import {
    fetchKlarnaPaymentOrder
} from "../../common/api";
import "./style.scss";

const KlarnaPaymentConfirmation = ({

}) => {
    // const [orderId, setOrderId] = useState(false);
    const [content, setContent] = useState("");
    const [isLoading, setLoader] = useState(false);

    const fetchOrder = async (orderId) => {
        if (!orderId) {
            toast.error('Invalid order', { autoClose: 5000 });
        }

        setLoader(true);
        const { status, data } = await fetchKlarnaPaymentOrder(orderId).catch(() => {
            toast.error('Payment confirmation failed', { autoClose: 5000 });
            setLoader(false);
            return;
          });

          if (status !== 201 || !data.html_snippet || !data.order_id) {
            toast.error('Payment confirmation failed', { autoClose: 5000 });
            return;
          }

          if (data.status === "checkout_complete") {
            toast.success('Payment confirmed', { autoClose: 5000 });
          } else {
            toast.error('Payment confirmation failed ', { autoClose: 5000 });
          }

        setContent(data.html_snippet);
        setLoader(false);
    }

    useEffect(() => {
        const id = window.localStorage.getItem("order_id");
        fetchOrder(id);
    }, []);

    return (
        <div className="klarna_payment_confirmation">
            <div className="heading">
                <h2>Payment confirmation</h2>
            </div>
            { isLoading &&
                <div className="loader">
                    <h3>Loading...</h3>
                </div>
            }
            {
                content &&
                <PaymentWidget
                    className="full_page"
                    content={content}
                />
            }
        </div>
    );
}

export default KlarnaPaymentConfirmation;
