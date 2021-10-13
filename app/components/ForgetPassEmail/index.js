/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import { forgetPassEmailSchema } from './schema';
import request from '../../utils/request';

const ForgetPassEmail = ({ history }) => {
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
  const handleForgetPassEmail = (values) => {
    setLoading(true);
    const { email } = values;
    console.log(email);
    request.postPublic('users/sendforgetPasswordEmail', { email })
    .then(response => {
      const { msg } = response.data;
      setLoading(false);
        toast.success(msg);
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
                initialValues={{email: '' }}
                validationSchema={forgetPassEmailSchema}
                onSubmit={values => {
                  handleForgetPassEmail(values);
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <div className="signin-form">
                    <Form id="contactform" disabled={isSubmitting}>
                      <label>Email Address</label>
                      <Field type="email" name="email" />
                      {errors.email && touched.email ? (
                        <div className="error">
                          {errors.email}
                        </div>
                      ) : null}
                       {!loading ? (
                        <button type="submit"  className="btn btnstyle3">Submit</button>
                    ) : (
                      <button type="submit"  className="btn btnstyle3"><span style={{color: "#fff"}}><i className="fa fa-spinner" /></span> Loading</button>
                    )}
                      {/* <small className="forgot grey">Forgot Password? <Link to="/">Reset</Link></small> */}
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
export default ForgetPassEmail;
