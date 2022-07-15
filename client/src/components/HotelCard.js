import { days } from '../actions/hotel';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const HotelCard = ({each, handleHotelDelete = (del) => del, owner = false, showMoreButton = true}) => {
    return(
    <div className='card mb-3' style={{ display: 'flex' }} key={each._id} >
    <div className='row no-gutters'>
        <div className='col-md-4'>
            {each.image && each.image.contentType ? (
                <img className='card-image img img-fluid' style={{height: '18rem'}}
                    src={`/hotel/image/${each._id}`} alt={each.title} />)
                : (<img className='card-image img img-fluid'
                    src="http://via.placeholder.com/500.png?text=hotel+image" alt="default" />
                )}
        </div>
        <div className='col-md-8'>
            <div className='card-body'>
                <h3 className='card-title'>{each.title} 
                <span className='float-end text-dark'>
                    S${each.price}
                </span></h3>
                <p className='alert alert-secondary'>{each.location}</p>
                <p className='card-text'>{`${each.content.substring(0, 200)}...`}</p>
                <p className='card-text'>
                    <span className='float-end text-danger'>
                        for {days(each.from, each.to)} {" "}
                        {days(each.from, each.to) <= 1 ? 'day' : 'days'}
                    </span>
                </p>
                <p className='card-text'>{each.bed} bed</p>
                <p className='card-text'>Available from {new Date(each.from).toLocaleDateString()}</p>
                <div className='d-flex justify-content-between'>
                    { showMoreButton && (
                    <Link to={`/hotel/${each._id}`}>
                    <button className='btn btn-warning'>Show more</button>
                    </Link>
                    )}
                    {owner && (
                    <>
                        <Link to={`../hotel/edit/${each._id}`}>
                            <EditOutlined className='text-warning' /></Link>
                        <DeleteOutlined className='text-danger' onClick={() => handleHotelDelete(each._id)} />
                    </>
                    )}

                </div>
            </div>
        </div>
    </div>
</div>

)}

export default HotelCard