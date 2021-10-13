/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
export const forgetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password too short!')
    .max(32, 'Password should less than 32 digits')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .when('password', {
      is: val => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be same',
      ),
    }),
});
