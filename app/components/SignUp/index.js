/* eslint-disable prettier/prettier */
/* eslint-disable indent */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { signupSchema } from './schema';
import request from '../../utils/request';

const SignUp = ({ history }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('accessToken') && request.getProfile().role === "kid") {
      console.log('if: ')

      history.push('/kidsdrawing');
    } else if (localStorage.getItem('accessToken') && request.getProfile().role === "professional") {
      history.push('/professionaldrawing');
      console.log('else if: ')

    }
    // else {
    //   console.log('else: ')
    //   localStorage.clear();
    // }
  }, []);
  const handleRegister = (values) => {
    setLoading(true);
    const { email, password, ageLevel, name, acceptTerms } = values;
    request.postPublic('users/register', { email, password, acceptTerms, name, ageLevel })
    .then(response => {
      const { token, user } = response.data;
      if(user.role === "kid"){
        request.setToken(token);
        request.setProfile(user);
        setLoading(false);
        toast.success("Register Successfully!");
        history.push('/kidsdrawing')
      }else{
        request.setToken(token);
        request.setProfile(user);
        setLoading(false);
        toast.success("Register Successfully!");
        history.push('/professionaldrawing')
      }
    }).catch(error =>{
      setLoading(false);
      toast.error(error.response.data.msg);
    })

  }
  return (
        <section className="generalsign signin signup">
            <div className="leftcontent">
                <h2>Sign Up</h2>
                <Formik
                initialValues={{ password: '', confirmPassword: '', email: '', name: '', acceptTerms: false, ageLevel: '', }}
                validationSchema={signupSchema}
                onSubmit={values => {
                  handleRegister(values);
                }}
              >
                {({ errors, touched, isSubmitting, setFieldValue }) => (
                  <div className="signin-form">
                    <Form id="contactform" disabled={isSubmitting}>
                      <label>Name</label>
                      <Field type="name" name="name" />
                      {errors.name && touched.name ? (
                        <div className="error">
                          {errors.name}
                        </div>
                      ) : null}
                      <label>Email Address</label>
                      <Field type="email" name="email" />
                      {errors.email && touched.email ? (
                        <div className="error">
                          {errors.email}
                        </div>
                      ) : null}
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
                      <label>Choose Age</label>
                      <select
                        name="ageLevel"
                        onChange={(e) => {
                          setFieldValue("ageLevel", e.target.value);
                        }}
                      >
                        <option label="Select Age Level" />
                        <option value="3-5" label="3-5 years" />
                        <option value="6-10" label="6-10 years" />
                      </select>
                      {errors.ageLevel && touched.ageLevel ? (
                        <div className="error">
                          {errors.ageLevel}
                        </div>
                      ) : null}
                      <div className="d-flex align-items-center">
                      <Field type="checkbox" name="acceptTerms" className="checkbox"  />
                      <small className="forgot grey mt-0"> I agree to all the statements included in the <Link className="pink" to="/">terms of service</Link></small>
                      </div>
                      {errors.acceptTerms && touched.acceptTerms ? (
                        <div className="error">
                          {errors.acceptTerms}
                        </div>
                      ) : null}
                       {!loading ? (
                        <button type="submit"  className="btn btnstyle3">Create Account</button>
                    ) : (
                      <button type="submit"  className="btn btnstyle3"><span style={{color: "#fff"}}><i className="fa fa-spinner" /></span> Loading</button>
                    )}
                      <small className="dontaccount grey">Already have an account? <Link to="/signin" className="pink">Sign In</Link></small>
                    </Form>
                  </div>

                )}
              </Formik>
            </div>
            <div className="rightcontent">
                <img className="img-fluid" src={require('../../assets/images/signup.png')} />
            </div>
        </section>
  )
}
export default SignUp;
