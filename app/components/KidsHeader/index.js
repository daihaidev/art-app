/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../utils/request';

const KidsHeader = ({ handlePencil, handlePen, handleBrush, handleCrayon, handleSpray, handleEraser, handleSave, handleClear, drawSelectedShape, fileChange, addAnimal, drawingPng, history }) => {
    const [profile, setProfile] = useState({});
    const imageRef = useRef(null);
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            request.getPrivate('users/getProfile')
                .then(response => {
                    setProfile(response && response.data.user);

                }).catch(error => {
                    toast.error(error.response.data.msg);
                })
        }
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userProfile');
        history.push('/signin');
    };
    const handleFileUpload = (e) => {
        fileChange(e);
        imageRef.current.value = null;
    }
    return (
        <>
            <header className="kidsheader ">
                <div className="menu dropdown">
                    <img src={require('../../assets/images/menu.png')} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropmenu">
                            <h3>File Menu</h3>
                            <img className="img-fluid cross" src={require('../../assets/images/cross.png')} />
                        </div>
                        <div className="dropmenu">
                            <div className="eachmenu">
                                <Link onClick={handleClear}>
                                    <img className="img-fluid" src={require('../../assets/images/newfile.png')} />
                                    <p>New File</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link onClick={handleSave}>
                                    <img className="img-fluid" src={require('../../assets/images/save.png')} />
                                    <p>Save</p>
                                </Link>
                            </div>
                        </div>
                        <div className="dropmenu">
                            <div className="eachmenu">
                                <Link onClick={handleClear}>
                                    <img className="img-fluid" src={require('../../assets/images/clear.png')} />
                                    <p>Clear</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link data-toggle="modal" data-target="#paymentdetailssteps" onClick={drawingPng}>
                                    <img className="img-fluid" src={require('../../assets/images/print.png')} />
                                    <p>Order Print</p>
                                </Link>
                            </div>
                        </div>
                        <div className="dropmenu">
                            <div className="eachmenu">
                            <Link to="/account">
                                    <img className="img-fluid" src={require('../../assets/images/agegroup.png')} />
                                <p>My Account</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                            <Link to="/myorders">
                                    <img className="img-fluid" src={require('../../assets/images/order.png')} />
                                    <p>Order List</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link to="/">
                        <p className="textlogo"><img width="50" src={require('../../assets/images/DiggiArt_png_1.png')} /></p>
                    </Link>
                </div>

                <div className="brushes">
                    <Link onClick={handlePencil}>
                        <img className="img-fluid" src={require('../../assets/images/brush1.png')} />
                    </Link>
                    <Link onClick={handlePen}>
                        <img className="img-fluid" src={require('../../assets/images/brush2.png')} />
                    </Link>
                    <Link onClick={handleBrush}>
                        <img className="img-fluid" src={require('../../assets/images/brush3.png')} />
                    </Link>
                    <Link onClick={handleCrayon}>
                        <img className="img-fluid" src={require('../../assets/images/brush6.png')} />
                    </Link>
                    <Link onClick={handleSpray}>
                        <img className="img-fluid" src={require('../../assets/images/brush4.png')} />
                    </Link>
                    <Link onClick={handleEraser}>
                        <img className="img-fluid" src={require('../../assets/images/eraser.png')} />
                    </Link>

                    <img id="dropdownMenuButton" style={{ "display": 'none' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" src={require('../../assets/images/shapes.png')} />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                        <div className="dropmenu">
                            <h3>Shapes</h3>
                            {/* <img className="img-fluid cross" src={require('../../assets/images/cross.png')} /> */}
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="dropmenu">
                            <div className="eachmenu">
                                <Link onClick={() => drawSelectedShape('square')}>
                                    <span style={{ color: '#fff', fontSize: "40px" }}><i className="fas fa-square"></i></span>
                                    {/* <img className="img-fluid" src={require('../../assets/images/clear.png')} /> */}
                                    <p>Square</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link onClick={() => drawSelectedShape('circle')}>
                                    <span style={{ color: '#fff', fontSize: "40px" }}><i className="far fa-circle"></i></span>
                                    {/* <img className="img-fluid" src={require('../../assets/images/print.png')} /> */}
                                    <p>Circle</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link onClick={() => drawSelectedShape('triangle')}>
                                    <span style={{ color: '#fff', fontSize: "40px" }}><i className="fas fa-play"></i></span>
                                    {/* <img className="img-fluid" src={require('../../assets/images/order.png')} /> */}
                                    <p>Triangle</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link className="animalshapes">
                        {/* <img className="img-fluid" src={require('../../assets/images/cat.svg')} /> */}
                        <img id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" width="50" src={require('../../assets/images/cat.svg')} />
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="dropmenu">
                                <h3>Animals</h3>
                                {/* <img className="img-fluid cross" src={require('../../assets/images/cross.png')} /> */}
                                <i className="fas fa-times"></i>
                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('square')}>
                                        <span style={{ color: '#fff', fontSize: "40px" }}><i className="fas fa-square"></i></span>
                                        {/* <img className="img-fluid" src={require('../../assets/images/clear.png')} /> */}
                                        <p>Square</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('circle')}>
                                        <span style={{ color: '#fff', fontSize: "40px" }}><i className="far fa-circle"></i></span>
                                        {/* <img className="img-fluid" src={require('../../assets/images/print.png')} /> */}
                                        <p>Circle</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('triangle')}>
                                        <span style={{ color: '#fff', fontSize: "40px" }}><i className="fas fa-play"></i></span>
                                        {/* <img className="img-fluid" src={require('../../assets/images/order.png')} /> */}
                                        <p>Triangle</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('cat')}>
                                        <img className="img-fluid" src={require('../../assets/images/cat.png')} />
                                        <p>Cat</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('dog')}>
                                        <img className="img-fluid" src={require('../../assets/images/dog.png')} />
                                        <p>Dog</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('horse')}>
                                        <img className="img-fluid" src={require('../../assets/images/horse.png')} />
                                        <p>Horse</p>
                                    </Link>
                                </div>

                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('goat')}>
                                        <img className="img-fluid" src={require('../../assets/images/goat.png')} />
                                        <p>Goat</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('eagle')}>
                                        <img className="img-fluid" src={require('../../assets/images/eagle.png')} />
                                        <p>Eagle</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('lion')}>
                                        <img className="img-fluid" src={require('../../assets/images/lion.png')} />
                                        <p>Lion</p>
                                    </Link>
                                </div>

                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('elephant')}>
                                        <img className="img-fluid" src={require('../../assets/images/elephant.png')} />
                                        <p>Elephant</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('rabbit')}>
                                        <img className="img-fluid" src={require('../../assets/images/rabbit.png')} />
                                        <p>Rabbit</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('tiger')}>
                                        <img className="img-fluid" src={require('../../assets/images/tiger.png')} />
                                        <p>Tiger</p>
                                    </Link>
                                </div>

                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('parrot')}>
                                        <img className="img-fluid" src={require('../../assets/images/parrot.png')} />
                                        <p>Parrot</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('monkey')}>
                                        <img className="img-fluid" src={require('../../assets/images/monkey.png')} />
                                        <p>Monkey</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('fish')}>
                                        <img className="img-fluid" src={require('../../assets/images/fish.png')} />
                                        <p>Fish</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('duck')}>
                                        <img className="img-fluid" src={require('../../assets/images/duck.png')} />
                                        <p>Duck</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('hen')}>
                                        <img className="img-fluid" src={require('../../assets/images/hen.png')} />
                                        <p>Hen</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => addAnimal('camel')}>
                                        <img className="img-fluid" src={require('../../assets/images/camel.png')} />
                                        <p>Camel</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className="uploadfile" onClick={() => imageRef.current.click()}>
                        <img width="50" className="img-fluid" src={require('../../assets/images/upload-file.svg')} />
                    </Link>
                </div>
                <div className="profile dropdown">
                    <Link className="btn btnstyle5 artboardbtn d-none" to={localStorage.getItem('accessToken') && request.getProfile().role === "kid" ? "/kidsdrawing" : "/professionaldrawing"}>Go to Artboard</Link>
                    {
                        localStorage.getItem('accessToken') ? <>  <img style={{ borderRadius: '50%' }} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" width="50" src={localStorage.getItem("accessToken") && request.getProfile().profileImage !== null ? `https://api.diggiart.com/public/users/${request.getProfile().profileImage}` : require('../../assets/images/profile.png')} />
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <p className="d-flex align-items-center">
                                    <img className="" src={require('../../assets/images/account.png')} />
                                    <Link
                                        className="dropdown-item" to={{
                                            pathname: `/account`,
                                            state: profile
                                        }}>Your Account</Link>
                                </p>
                                <p className="d-flex align-items-center">
                                    <img className="" src={require('../../assets/images/ordericon.png')} />
                                    <Link className="dropdown-item" to="/myorders">My Orders</Link>
                                </p>
                                <p className="d-flex align-items-center">
                                    <img className="" src={require('../../assets/images/logout.png')} />
                                    <Link onClick={handleLogout} className="dropdown-item" >Logout</Link>
                                </p>
                            </div> </> : null
                    }

                </div>
            </header>
            <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef} onChange={handleFileUpload} />
        </>
    )
}
export default withRouter(KidsHeader);