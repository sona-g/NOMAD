import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { stripeSuccessRequest } from '../../actions/stripe';
import { LoadingOutlined } from '@ant-design/icons'


const StripeSuccess = () => {
    const { hotelId } = useParams();
    const { auth } = useSelector((state) => ({ ...state }));
    let navigate = useNavigate();

    useEffect(() => {
        //console.log("send this hotel id to backend to create order", {hotelId})
        stripeSuccessRequest(auth.token, hotelId)
        .then(res => {
            if(res.data.success) {
                console.log("stripe success response", res.data)
                navigate("../dashboard", { replace: true });
            } else {
                navigate("../stripe/cancel", { replace: true });
            }
            
        })
    }, [])

    return (
        <div className='container'>
            <div className='d-flex justify-content-center p-5'>
            <LoadingOutlined className='h1 text-danger p-5' />
            </div>
        </div>
    );
};

export default StripeSuccess;