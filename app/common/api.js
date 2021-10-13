
import axios from "axios";

export const createKlarnaPaymentOrder = async (body = {}) => {
  return await axios.post(`${process.env.API_HOST}klarna/payment/order`, body);
};

export const fetchKlarnaPaymentOrder = async (orderId) => {
    return await axios.get(`${process.env.API_HOST}klarna/payment/order/${orderId}`);
  };
