import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import StripeHeader from '../../components/StripeHeader';
import { useSelector } from 'react-redux';
import { userHotelBookings } from '../../actions/hotel';
import BookingCard from '../../components/BookingCard';

const Dashboard = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const  [booking, setBooking] = useState([])

    useEffect(()=> {
        displayUserBookings()
    }, []);

    const displayUserBookings = async () => {
        const res = await userHotelBookings(auth.token);
        console.log(res);
        setBooking(res.data);
    };

    return (
        <>
        <div className='container-fluid bg-light p-3'>
            <StripeHeader />
        </div>
        <div className='container-fluid p-4'>
        <DashboardHeader />
        </div>
        {!auth.userInfo.stripe_seller &&
        <div>
        <div className='container- fluid'>
            <div className='row'>
                <div className='col-md-10'>
                {/* <h2>Your Bookings</h2> */}
                </div>
                
                <div className='col-md-2'>
                    <Link className='btn btn-warning' to="/">Browse Hotels</Link>
                </div>
                </div>
        </div>
        <br/>
        <div className='row'>
            {/* <pre>{JSON.stringify(booking, null, 4)}</pre> */}
        { booking.map(booked => (
            <BookingCard key={booked._id} hotel={booked.hotel} 
            session={booked.session} orderedBy={booked.orderedBy}/>
        ))}
        </div>
        </div>
}
        </>
    );
};

export default Dashboard;