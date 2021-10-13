/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SketchPicker } from 'react-color';
import 'emoji-mart/css/emoji-mart.css'
import { toImage } from 'react-emoji-component'
import { Picker } from 'emoji-mart'
import request from '../../utils/request';

const ProfessionalHeader = ({ drawingPng, addEmoji, fileChange, drawText, drawSelectedShape, handleColor, handlePencil, handlePen, handleBrush, handleEraser, handleSave, handleClear }) => {
    const [profile, setProfile] = useState({});
    const [color, setColor] = useState('#FF0000');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        request.getPrivate('users/getProfile')
            .then(response => {
                setProfile(response && response.data.user);

            }).catch(error => {
                toast.error(error.response.data.msg);
            })
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userProfile')
    }
    const handleFileUpload = (e) => {
        fileChange(e);
        imageRef.current.value = null;
    }
    return (
        <>
            <header className="kidsheader professionalheader">
                <div className="menu dropdown">
                    <img src={require('../../assets/images/menu2.png')} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropmenu d-flex justify-content-between pl-3">
                            <h3>File Menu</h3>
                            <img className="img-fluid cross" src={require('../../assets/images/cross.png')} />
                        </div>
                        <div className="dropmenu">
                            <div className="eachmenu">
                                <Link onClick={handleClear}>
                                    <img className="img-fluid" src={require('../../assets/images/newfilep.png')} />
                                    <p>New</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link onClick={handleClear}>
                                    <img className="img-fluid" src={require('../../assets/images/openp.png')} />
                                    <p>Open</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link onClick={handleSave}>
                                    <img className="img-fluid" src={require('../../assets/images/savep.png')} />
                                    <p>Save</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link onClick={() => imageRef.current.click()}>
                                    <img className="img-fluid" src={require('../../assets/images/importp.png')} />
                                    <p>Import</p>
                                </Link>
                            </div>
                            <div className="eachmenu">
                                <Link data-toggle="modal" data-target="#paymentdetailssteps" onClick={drawingPng}>
                                    <img className="img-fluid" src={require('../../assets/images/orderprintp.png')} />
                                    <p>Order print</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="brushes">
                    <NavLink activeClassName='is-active' onClick={handlePencil}>
                        <img width="35" className="img-fluid" src={require('../../assets/images/pen.svg')} />
                    </NavLink>
                    <NavLink activeClassName='is-active' onClick={handlePen}>
                        <img width="35" className="img-fluid" src={require('../../assets/images/marker.svg')} />
                    </NavLink>
                    <Link onClick={handleBrush}>
                        <img width="35" className="img-fluid" src={require('../../assets/images/brush.svg')} />
                    </Link>
                    <Link onClick={handleEraser}>
                        <img width="35" className="img-fluid" src={require('../../assets/images/eraser.svg')} />
                    </Link>
                    {/* <Link>
                        <img className="img-fluid" src={require('../../assets/images/picker.png')} />
                    </Link> */}

                    <Link>
                        <img width="35" src={require('../../assets/images/shaper.svg')} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" />
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="dropmenu d-flex justify-content-between pl-3">
                                <h3>Shapes</h3>
                                <img className="img-fluid cross" src={require('../../assets/images/cross.png')} />
                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('circle')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="far fa-circle"></i></span>
                                        <p>Oval</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('square')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="fas fa-square"></i></span>
                                        <p>Square</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('roundedSquare')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="far fa-square"></i></span>
                                        <p>Rounded Square</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('triangle')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="fas fa-play"></i></span>
                                        <p>Triangle</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('diamond')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="far fa-star"></i></span>
                                        <p>Diamond</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('pentagon')}>
                                        <img className="img-fluid" src={require('../../assets/images/settingsp.png')} />
                                        <p>Pentagon</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('hexagon')}>
                                        <img className="img-fluid" src={require('../../assets/images/settingsp.png')} />
                                        <p>Hexagon</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('fourPointStar')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="far fa-star"></i></span>
                                        <p>4 Point Star</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('star')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="far fa-star"></i></span>
                                        <p>5 Point Start</p>
                                    </Link>
                                </div>
                                <div className="eachmenu">
                                    <Link onClick={() => drawSelectedShape('arrow')}>
                                        <span style={{ color: `#fff`, fontSize: "20px", paddingRight: "15px" }}><i className="fa fa-arrow-right"></i></span>
                                        <p>Arrow</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* <img className="img-fluid" src={require('../../assets/images/star.png')} /> */}

                    </Link>
                    <Link>

                        <img id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" width="35" src={require('../../assets/images/emojis.svg')} />

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="dropmenu d-flex justify-content-between pl-3">
                                <h3>Emojis</h3>
                                <img className="img-fluid cross" src={require('../../assets/images/cross.png')} />
                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    {/* <Picker title='Pick your emoji…' emoji='point_up' /> */}
                                    <Picker onSelect={(e) => addEmoji(toImage(e.unified, { size: 64 }))} theme='dark' emojiTooltip i18n={{ search: 'Search Here..', categories: { search: 'Search results', recent: 'Recents' } }} />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link onClick={drawText}>
                        <img width="35" className="img-fluid" src={require('../../assets/images/text.svg')} />
                    </Link>
                    <Link
                    // onClick={() => {
                    //     setShowColorPicker(!showColorPicker);
                    // }}
                    >
                        <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" style={{ color: `${color}`, fontSize: "25px" }}><i className="fa fa-circle"></i></span>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="dropmenu d-flex justify-content-between pl-3">
                                <h3>Colors</h3>
                                <img className="img-fluid cross" src={require('../../assets/images/cross.png')} />
                            </div>
                            <div className="dropmenu">
                                <div className="eachmenu">
                                    <Link>
                                        <SketchPicker
                                            color={color}
                                            onChange={(col) => {
                                                setColor(col.hex);
                                                handleColor(col.hex);
                                                setShowColorPicker(!showColorPicker);
                                            }}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className="profile dropdown">
                        <img style={{ borderRadius: '50%' }} id="dropdownMenuButton" width="50" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="img-fluid" src={localStorage.getItem("accessToken") && request.getProfile().profileImage !== null ? `https://api.diggiart.com/public/users/${request.getProfile().profileImage}` : require('../../assets/images/profile.png')} />
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <p className="d-flex align-items-center">
                                <img width="35" className="" src={require('../../assets/images/account.png')} />
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
                                <Link onClick={handleLogout} className="dropdown-item" to="/signin">Logout</Link>
                            </p>
                        </div>
                    </Link>
                </div>
            </header>
            <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef} onChange={handleFileUpload} />
        </>
    )
}
export default ProfessionalHeader;