/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
export const orderFormAddressSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  // acceptTerms: Yup.boolean().oneOf(
  //   [true],
  //   'You must accept the terms of services',
  // ),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  zipCode: Yup.string().required('Zip Code is required'),
});

export const orderPaymentSchema = Yup.object().shape({
  cardHolderName: Yup.string().required('Card Holder Name is required'),
  cardNumber: Yup.string().required('Card Number is required'),
  expiryDate: Yup.string().required('Expiry Date is required'),
  cvv: Yup.string().required('CVV is required'),
});


