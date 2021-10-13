
import axios from "axios";

export const getProduct = serial =>
  axios.get(`/.netlify/functions/product/${serial}`);

export const createSession = ({ order_lines }) =>
  axios.post(`${process.env.API_HOST}klarnaOrderRequest`, { order_lines });

export const createOrder = ({ authorization_token, order_lines }) =>
  axios.post(`${process.env.API_HOST}klarnaCreateOrder`, {
    authorization_token,
    order_lines
  });

export const getOrder = orderId =>
  axios.get(`/.netlify/functions/order/${orderId}`);
  export const sizes = {
    xs: 2,
    s: 5,
    m: 10,
    l: 15,
    xl: 20
  };

  export const colors = {
    black: "#333",
    grey: "#eee"
  };

export const createKlarnaPaymentOrder = async (body = {}) => {
  return await axios.post(`${process.env.API_HOST}klarna/payment/order`, body);
}
