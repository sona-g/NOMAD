import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { account } from '../../actions/stripe';
import { updateUser } from '../../actions/auth'
import { Link, useNavigate } from 'react-router-dom';


const StripeCallback = () => {
    const { auth } = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accountStatus = async () => {
        try {
            const status = await account(auth.token);
            console.log("stripe account status", status);
            //update user in local storage
            updateUser(status.data, () => {
                //update user in redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: status.data
                })
                //redirect user to dashboard
                navigate("../dashboard/seller", { replace: true });
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if(auth && auth.token) {
            accountStatus()
        }
    }, [auth])
    return (
        <div>
            <div className='d-flex justify-content-center p-5'>
        <LoadingOutlined className='h1 p-5 text-danger' />
            </div>
        </div>
    );
};

export default StripeCallback;