/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
export const forgetPassEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});