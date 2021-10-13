/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button} from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { resetPasswordSchema, updateProfileSchema, changeLevelSchema } from './schema';
import KidsHeader from '../KidsHeader';
import request from '../../utils/request';

const Accounts = (props) => {
    const [profile, setProfile] = useState(props.location.state);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [imageFlag, setImageFlag] = useState(false);
	const imageRef = useRef(null);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
	const handleResetPassword = (values) => {
        setPasswordLoading(true);
        const {oldPassword, newPassword} = values;
        request.postPrivate('users/resetPassword',{ oldPassword, newPassword})
        .then(response => {
            toast.success(response.data.msg);
            setPasswordLoading(false);

        }).catch(error => {
            toast.error(error.response.data.msg);
            setPasswordLoading(false);
        })
    };
    const handleUpdateProfile = (values) => {
        setProfileLoading(true);
        const { name } = values;
        request.postPrivate('users/updateProfile',{ name })
        .then(response => {
            const { user, msg } = response && response.data;
            toast.success(msg);
            setProfileLoading(false);
            setProfile(user);

        }).catch(error => {
            toast.error(error.response.data.msg);
            setProfileLoading(false);
        })
    };
    const handleFileClick = () => {
        imageRef.current.click();
    }

    const handleFileUpload = ({ target: { files } }) => {
        const formData = new FormData();
        formData.append('profileImage', files[0]);

        // const config = {
        //     onUploadProgress: progressEvent => {
        //         const { loaded, total } = progressEvent;
        //         const percent = Math.floor((loaded * 100) / total);
        //         console.log("p: ---",percent);
        //         if(percent < 100){
        //             setUploadPercentage(percent);
        //         }else {
        //             setUploadPercentage(percent);
        //         }

        //     }
        // };
        setImageFlag(true);
        request.postPrivate(`users/updateProfilePicture`, formData)
        .then(response => {
            const { user, msg } = response && response.data;
            toast.success(msg);
            setProfile(user);
			setImageFlag(false);
			const d = {
				id: user.id,
				name: user.name,
				email: user.email,
				ageLevel: user.ageLevel,
				profileImage: user.profileImage,
				role: user.role,	  
			};
			request.setProfile(d);
        }).catch(error => {
            toast.error(error.response.data.msg);
            setImageFlag(false);
        })
	}
	const handleChangeLevel = (values) => {
		setLoading(true);
        const {ageLevel} = values;
        request.postPrivate('users/changeLevel',{ ageLevel })
        .then(response => {
			const { user } = response && response.data;
			toast.success('Level changed successfully!');
			setShow(false);
			setLoading(false);
			const d = {
				id: user.id,
				name: user.name,
				email: user.email,
				ageLevel: user.ageLevel,
				profileImage: user.profileImage,
				role: user.role,	  
			};
			request.setProfile(d);
			if (ageLevel === '3-5'){
				return props.history.push('/kidsdrawing');
			}
			return props.history.push('/professionaldrawing');
			
        }).catch(() => {
            toast.error('something went wrong');
            setLoading(false);
        });
	}
	return (
        <>
		<div className="main-wrap adminarea">
			<KidsHeader/>
			<div className="generalpanel">
				<div className="backbar">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-12">
								<div className="d-flex align-items-center">
									<img className="" src={require('../../assets/images/backarrow.png')} />
									<h1>Your Account</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container accountwrap">
					<div className="row">
						<div className="col-md-12">
							<div className="orderbox">
								<div className="title">
									<h3>My Profile</h3>
								</div>
								<div className="d-flex">
									<div className="orderid" style={{width: '100px'}}>
                                        {/* {imageFlag ? <CircularProgressbar  styles={buildStyles ({ textSize: '15px', textColor: '#FF4C66', pathColor: '#FF4C66'})} value={uploadPercentage} text={`${uploadPercentage}%`} /> : <img className="" style={{width: '100px', borderRadius: '50px'}} src={profile && profile.profileImage !== null ? `https://api.diggiart.com/public/users/${profile.profileImage}` : require('../../assets/images/upload.png')} />} */}
                                        {imageFlag ?  <ReactLoading type='bars' color='#FF4C66' height={50} width={100} /> : <img style={{width: '100%', height: '100%', borderRadius: '50%'}} src={profile && profile.profileImage !== null ? `https://api.diggiart.com/public/users/${profile.profileImage}` : require('../../assets/images/upload.png')} />}
										
									</div>
									<div className="orderstatus">
										<p className="">Edit Profile Image</p>
                                        <input type="file" hidden id="profileImage" name="profileImage" accept="image/*" ref={imageRef} onChange={handleFileUpload}/>
										<Link className="btn btnstyle3" onClick={handleFileClick}>
											Update
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="orderbox">
								<div className="title">
									<h3>User Info</h3>
								</div>
								<Formik
									initialValues={{ name: profile ? profile.name : '', email: profile ? profile.email : '' }}
									validationSchema={updateProfileSchema}
									onSubmit={(values) => {
									handleUpdateProfile(values);
									}}
								>
									{({ errors, touched, isSubmitting }) => (
										<div className="account-form">
											<Form id="contactform" disabled={isSubmitting}>
												<div className="d-inline">
													<Field
														className="mr-2"
														type="text"
														name="name"
														placeholder="Name"
													/>
													{errors.name && touched.name ? (
														<div className="error">{errors.name}</div>
													) : null}
													<Field type="email" disabled name="email" placeholder="Email" />
                                                    {!profileLoading ? (
                        <button type="submit" className="btn btnstyle4">Update Profile</button>
                    ) : (
                        <button type="submit" className="btn btnstyle4"><span style={{color: "#000"}}><i className="fa fa-spinner" /></span> Loading</button>
                    )}
												</div>
											</Form>
										</div>
									)}
								</Formik>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="orderbox">
								<div className="title">
									<h3>Change Password</h3>
								</div>
								<Formik
									initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
									validationSchema={resetPasswordSchema}
									onSubmit={(values) => {
										handleResetPassword(values);
									}}
								>
									{({ errors, touched, isSubmitting }) => (
										<div className="account-form">
											<Form id="contactform" disabled={isSubmitting}>
												<div className="d-inline">
													<Field
														className="mr-2"
														type="password"
														name="oldPassword"
														placeholder="Enter Old Password"
													/>
													{errors.oldPassword && touched.oldPassword ? (
														<div className="error">{errors.oldPassword}</div>
													) : null}
													<div className="d-flex align-items-center">
														<Field
															type="password"
															name="newPassword"
															placeholder="Enter New Password"
														/>
														{errors.newPassword && touched.newPassword ? (
															<div className="error d-block">{errors.newPassword}</div>
														) : null}
														<Field
															type="password"
															name="confirmNewPassword"
															className="ml-2 mr-2"
															placeholder="Confirm New Password"
														/>
														{errors.confirmNewPassword && touched.confirmNewPassword ? (
															<div className="error d-block">
																{errors.confirmNewPassword}
															</div>
														) : null}
                                                        {!passwordLoading ? (
                        <button type="submit" className="btn btnstyle4">Reset Password</button>
                    ) : (
                        <button type="submit" className="btn btnstyle4"><span style={{color: "#000"}}><i className="fa fa-spinner" /></span> Loading</button>
                    )}
													</div>
												</div>
											</Form>
										</div>
									)}
								</Formik>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="orderbox">
								<div className="title">
									<h3>Age Level</h3>
								</div>
								
										<div className="account-form">
											
												<div className="d-inline">
													<div className="text-left">
														<p>You are currently at level: {profile ? profile.ageLevel : ''}</p>
														<button onClick={handleShow} className="btn btnstyle4">Change Level</button>
													</div>
												</div>
											
										</div>
							</div>
						</div>
						
						<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
		<Formik
                initialValues={{ ageLevel: '', }}
                validationSchema={changeLevelSchema}
                onSubmit={values => {
                  handleChangeLevel(values);
                }}
              >
                {({ errors, touched, isSubmitting, setFieldValue }) => (
                  <div className="signin-form">
                    <Form id="contactform" disabled={isSubmitting}>
                    
                      <select
                        name="ageLevel"
                        onChange={(e) => {
                          setFieldValue("ageLevel", e.target.value);
                        }}
                      >
                        <option label="Select Age Level" />
                        {profile && profile.ageLevel === '6-10' ? <option value="3-5" label="3-5 years" /> : <option value="6-10" label="6-10 years" />}
                      </select>
                      {errors.ageLevel && touched.ageLevel ? (
                        <div className="error">
                          {errors.ageLevel}
                        </div>
                      ) : null}
					          <Modal.Footer>
          <Button style={{backgroundColor: '#6C757D', border: 'none'}} className="btn btnstyle3" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          { !loading ? <Button type="submit" className="btn btnstyle3" variant="primary">
            Change
          </Button> : <Button type="submit" className="btn btnstyle3" variant="primary">
		  <span style={{color: "#fff"}}><i className="fa fa-spinner" /></span> Loading
          </Button>}
        </Modal.Footer>
                       {/* {!loading ? (
                        <button type="submit"  className="btn btnstyle3">Create Account</button>
                    ) : (
                      <button type="submit"  className="btn btnstyle3"><span style={{color: "#fff"}}><i className="fa fa-spinner" /></span> Loading</button>
                    )} */}
                    </Form>
                  </div>
                 
                )}
              </Formik>
		</Modal.Body>
      </Modal>
					</div>
				</div>
			</div>
		</div>
        </>
	);
};
export default Accounts;
