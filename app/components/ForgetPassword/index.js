/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import { forgetPasswordSchema } from './schema';
import request from '../../utils/request';

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('accessToken') && request.getProfile().role === "kid") {
      console.log('if: ')
      props.history.push('/kidsdrawing');
    } else if (localStorage.getItem('accessToken') && request.getProfile().role === "professional") {
      props.history.push('/professionaldrawing');
      console.log('else if: ')

    }
    // else {
    //   console.log('else: ')
    //   localStorage.clear();
    // }
  }, []);
  const handleForgetPassword = (values) => {
    setLoading(true);
    const {userId, token} = props.match.params;
    const { password } = values;
    request.postPublic(`users/forgetPassword/:userId/:token/${userId}/${token}`, { password })
    .then(response => {
        const { msg } = response.data;
        setLoading(false);
        toast.success(msg);
        props.history.push('/signin')
    }).catch(error =>{
      setLoading(false);
      toast.error(error.response.data.msg);
    })

  }
  return (
        <section className="generalsign signin">
            <div className="leftcontent">
                <h2>Forget Password</h2>
                <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={forgetPasswordSchema}
                onSubmit={values => {
                  handleForgetPassword(values);
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <div className="signin-form">
                    <Form id="contactform" disabled={isSubmitting}>
                      <label>Password</label>
                      <Field type="password" name="password" />
                      {errors.password && touched.password ? (
                        <div className="error">
                          {errors.password}
                        </div>
                      ) : null}
                      <label>Confirm Password</label>
                       <Field type="password" name="confirmPassword" />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="error">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                       {!loading ? (
                        <button type="submit"  className="btn btnstyle3">Submit</button>
                    ) : (
                      <button type="submit"  className="btn btnstyle3"><span style={{color: "#fff"}}><i className="fa fa-spinner" /></span> Loading</button>
                    )}
                      {/* <small className="forgot grey">Forgot Password? <Link to="/sendForgetPasswordEmail">Reset</Link></small> */}
                      <small className="dontaccount grey">Don't have an account? <Link to="/signup" className="pink">Sign Up</Link></small>
                    </Form>
                  </div>

                )}
              </Formik>
            </div>
            <div className="rightcontent">
                <img className="img-fluid" src={require('../../assets/images/signin.png')} />
            </div>
        </section>
  )
}
export default SignIn;
