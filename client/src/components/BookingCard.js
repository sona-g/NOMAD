import React, { useState} from 'react';
import { days } from '../actions/hotel';
import { Link } from "react-router-dom";
import OrderModal from './OrderModal';


const BookingCard = ({hotel, session, orderedBy}) => {
    const [showModal, setShowModal] = useState(false);

    return(
        <div className='card mb-3' style={{ display: 'flex' }} key={hotel._id} >
        <div className='row no-gutters'>
            <div className='col-md-4'>
                {hotel.image && hotel.image.contentType ? (
                    <img className='card-image img img-fluid' style={{height: '18rem'}}
                        src={`/hotel/image/${hotel._id}`} alt={hotel.title} />)
                    : (<img className='card-image img img-fluid'
                        src="http://via.placeholder.com/500.png?text=hotel+image" alt="default" />
                    )}
            </div>
            <div className='col-md-8'>
                <div className='card-body'>
                    <h3 className='card-title'>{hotel.title} <span className='float-end text-dark'>
                        S${hotel.price}
                    </span></h3>
                    <p className='alert alert-secondary'>{hotel.location}</p>
                    <p className='card-text'>{`${hotel.content.substring(0, 200)}...`}</p>
                    <p className='card-text'>
                        <span className='float-end text-danger'>
                            for {days(hotel.from, hotel.to)} {" "}
                            {days(hotel.from, hotel.to) <= 1 ? 'day' : 'days'}
                        </span>
                    </p>
                    {showModal && (
                    <OrderModal session={session} orderedBy={orderedBy}
                    showModal={showModal} setShowModal={setShowModal}/>
                    )}
                    <p className='card-text'>{hotel.bed} bed</p>
                    <p className='card-text'>Available from {new Date(hotel.from).toLocaleDateString()}</p>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-danger' onClick={() => setShowModal(!showModal)}>Show Payment info</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
    )
};

export default BookingCard;