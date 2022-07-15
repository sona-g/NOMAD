import React, { useState, useEffect } from 'react';
import { view, days, alreadyBooked } from '../../actions/hotel';
import { getSessionId } from '../../actions/stripe';
import { useNavigate,  useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
 

const HotelDetail = () => {
    const [hotel, setHotel] = useState({})
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [bookedHotel, setBookedHotel] = useState(false)
    const { hotelId } = useParams();
    const { auth } = useSelector((state) => ({...state}))
    let navigate = useNavigate();

    useEffect(() => {
        showSellerHotel()
    }, [])

    useEffect(() => {
        if (auth && auth.token) {
            alreadyBooked(auth.token, hotelId)
            .then(res => {
                //console.log(res)
                if(res.data.ok) {setBookedHotel(true)}
            })
        }
    }, [])

    const showSellerHotel = async () => {
        //console.log(hotelId);
        let res = await view(hotelId);
        //console.log(res);
        setHotel(res.data);
        setImage(`/hotel/image/${res.data._id}`)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if(!auth || !auth.token) {
            navigate("../login", { replace: true });
            return;
        }
        setLoading(true)
        if(!auth) {
            navigate("../login", { replace: true });
    }
    //console.log(auth.token, hotelId)
    let res = await getSessionId(auth.token, hotelId)
    //console.log(`get sessionId`, res.data.sessionId)
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe.redirectToCheckout({
        sessionId: res.data.sessionId
    })
    .then((result) => console.log(result));
}
    return (
        <>
            <div className='container-fluid bg-light p-3 text-center'>
                <h5>{hotel.title}</h5>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                        <br />
                        <img className='img img-fluid m-2' src={image} alt={hotel.title}/>
                        </div>
                        <div className='col-md-6'>
                            <br/>
                            <p>{hotel.content}</p>
                            <p className='alert alert-secondary mt-3'>${hotel.price}</p>
                            <p className='card-text'>
                                <span className='float-right text-danger'>
                                for {days(hotel.from, hotel.to)} {" "}
                        {days(hotel.from, hotel.to) <= 1 ? 'day' : 'days'}
                                </span>
                            </p>
                            <p>From <br/>{" "} 
                            {moment(new Date(hotel.from)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <p>To <br/>{" "} 
                            {moment(new Date(hotel.to)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
                            <br/>
                            
                                {!auth.userInfo.stripe_seller &&
                                (<button className="btn btn-block btn-lg btn-warning mt-3"
                            onClick={handleClick} disabled={loading || bookedHotel}>
                                    {bookedHotel ? "Booked" : auth && auth.token ? "Book Now" : "Login to Book"}</button>)}
                        </div>
                        </div>
                        </div>
        </>
    );
};

export default HotelDetail;