/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
export const resetPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Password too short!')
    .max(32, 'Password should less than 32 digits')
    .required('Old Password is required'),
  newPassword: Yup.string()
    .min(6, 'Password too short!')
    .max(32, 'Password should less than 32 digits')
    .required('New Password is required'),
  confirmNewPassword: Yup.string()
    .required('Confirm new password is required')
    .when('newPassword', {
      is: val => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Both password need to be same',
      ),
    }),
});

export const updateProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

export const changeLevelSchema = Yup.object().shape({
  ageLevel: Yup.string().required('Age level is required'),
});
