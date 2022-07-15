import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import StripeHeader from '../../components/StripeHeader';
import { sellerHotels } from '../../actions/hotel';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { createStripeAccount } from '../../actions/stripe';
import { toast } from 'react-toastify';
import HotelCard from '../../components/HotelCard';
import { deleteHotel } from '../../actions/hotel'

const DashboardSeller = () => {
   const { auth } = useSelector((state) => ({ ...state }));
   const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        displaySellerHotels();
    }, []);

const displaySellerHotels = async () => {
        let hotelBySeller = await sellerHotels(
            auth.token
            );
        setHotels(hotelBySeller.data)
    }
    
    const handleClick = async () => {
        setLoading(true)
        try {
            //get login link
            let connection = await createStripeAccount(auth.token);
            console.log(connection);
            window.location.href = connection.data;
        } catch (error) {
            console.log(error);
            toast.info("Stripe not connected");
            setLoading(false);
        }
    }

    const handleHotelDelete = async (hotelId) => {
        if(window.confirm("Are you sure?")) {
            deleteHotel(auth.token, hotelId).then(res => {
            toast.info("Hotel deleted");
            displaySellerHotels();
        })
        }
    }

    const connected = () => {
        return(
        <div className='container- fluid'>
                <div className='row'>
                    <div className='col-md-10'>
                        {/* <h2>Your Hotels</h2> */}
                    </div>
                    <div className='col-md-2'>
                        <Link className='btn btn-warning' to="/hotels/new">Add New</Link>
                    </div>
                </div>
                <br/>
                <div className="row">
                {hotels.map((each) => {
                    return(
                        <HotelCard key={each._id} each={each} 
                        showMoreButton =  {false} owner = {true}
                        handleHotelDelete={handleHotelDelete}
                        />
                    )
                })}
                </div>
            </div>

    )}

    const notConnected = () => {
        return(
            <div className='container- fluid'>
                    <div className='row'>
                        <div className='col-md-6 offset md-3 text-center'>
                            <div className='p-5 pointer'>
                                <HomeOutlined className='h1'/>
                                <h4>Setup Payouts to post as a seller</h4>
                                <p className='lead'>NOMAD partners with Stripe for all payouts</p>
                                <button className='btn btn-danger mb-3' onClick={handleClick} 
                                disabled={loading}>{loading ? 'Processing' : 'Setup Payouts'}</button>
                                <p className='text-muted'><small>Redirect me to stripe</small></p>
                            </div>
                        </div>
                    </div>
                </div>
    
        )}


    return (
        <>
            <div className='container-fluid bg-light p-3'>
                <StripeHeader />
            </div>
            <div className='container-fluid p-4'>
                <DashboardHeader />
            </div>
            {/* auth && auth.userInfo &&  */}
            {auth.userInfo.stripe_seller && 
            auth.userInfo.stripe_seller.charges_enabled ?
            connected() :
            (auth.userInfo.stripe_seller && notConnected())}
        </>
    );
};

export default DashboardSeller;