/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ReactLoading from 'react-loading';
import request from '../../utils/request';

import KidsHeader from '../KidsHeader';



const AdminArea = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true);
        request.getPrivate('users/getAllOrders')
        .then(response => {
            setOrders(response && response.data.orders);
            setLoading(false);
    
        }).catch(error => {
            setLoading(false);
            toast.error('Something went wrong!');
        })
    }, []);
  return (
        <>
        <div className="main-wrap adminarea">
            <KidsHeader />
            <div className="generalpanel">
               <div className="backbar">
                   <div className="container-fluid">
                       <div className="row">
                           <div className="col-md-12">
                               <div className="d-flex align-items-center">
                                    <img className="" src={require('../../assets/images/backarrow.png')} />
                                    <h1>My Orders</h1>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <div className="container orderwrap">
                    <div className="row">
                       {
                           orders && orders.length > 0 && !loading ? 
                           orders.map(order=> {
                               return (
                                <div className="col-md-6" key={order._id}>
                                <div className="orderbox">
                                    <div className="orderid">
                                        <img className="" src={order.image ? order.image : require('../../assets/images/orderimg.png')} />
                               <p>Order# {order._id}</p>
                                        
                                    </div>
                                    <div className="orderstatus">
                                        <p className="papersize">{order.format}</p>
                                        <p className="date">{new Date(order.createdAt).toLocaleDateString()}</p>
                               <p className="price">{order.price} kr</p>
                                        <Link className={ order.status === "Pending" ? "btn btn-danger" : "btn btn-success"} to="/">{order.status}</Link>
                                    </div>
                                </div>
                            </div>
                               )
                           }) :  <>
                           {!loading ? <p>No order Found</p> : <ReactLoading type='bars' color='#FF4C66' height={50} width={100} /> }
                           </> 
                       }
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}
export default AdminArea;