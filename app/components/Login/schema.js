/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email Address')
    .required('Please enter your email'),
});

export const ContactUsScheme = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email Address')
    .required('Please enter your email'),
  name: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
});

export const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password too short!')
    .max(32, 'Password should less than 32 digits')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Please confirm your password!')
    .when('password', {
      is: val => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    }),
});
export const ProfileSchema = Yup.object().shape(
  {
    oldPassword: Yup.string().when(['newPassword', 'confirmPassword'], {
      is: (newPass, conPass) => newPass || conPass,
      then: Yup.string()
        .required('Required')
        .min(6, 'Password too short!')
        .max(32, 'Password should less than 32 digits'),
    }),
    newPassword: Yup.string().when(['oldPassword', 'confirmPassword'], {
      is: (oldPass, conPass) => oldPass || conPass,
      then: Yup.string()
        .required('Required')
        .min(6, 'Password too short!')
        .max(32, 'Password should less than 32 digits'),
    }),
    confirmPassword: Yup.string().when(['oldPassword', 'newPassword'], {
      is: (oldPass, newPass) => oldPass || newPass,
      then: Yup.string()
        .required('Required')
        .min(6, 'Password too short!')
        .max(32, 'Password should less than 32 digits')
        .when('newPassword', {
          is: val => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('newPassword')],
            'Both password need to be the same',
          ),
        }),
    }),
  },
  [
    ['oldPassword', 'newPassword'],
    ['oldPassword', 'confirmPassword'],
    ['newPassword', 'confirmPassword'],
  ],
);
