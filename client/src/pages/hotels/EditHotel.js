import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { view, updateHotel } from '../../actions/hotel';
import { useSelector } from 'react-redux';
import { DatePicker, Space, Select } from 'antd';
import moment from 'moment';
import Autocomplete from 'react-google-autocomplete';

const config = process.env.REACT_APP_PLACES_API_KEY;
const { Option } = Select;
const { RangePicker } = DatePicker;


const EditHotel = () => {
    const { auth } = useSelector((state) => ({ ...state }))

    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        price: "",
        from: "",
        to: "",
        bed: ""
    })
    //const [location, setLocation] = useState("");
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('http://via.placeholder.com/100.png?text=PREVIEW');

    const { hotelId } = useParams();

    useEffect(() => {
        showSellerHotel();
    }, [])

    const showSellerHotel = async () => {
        //console.log(hotelId);
        let res = await view(hotelId);
        console.log(res);
        setValues({ ...values, ...res.data });
        setPreview(`/hotel/image/${res.data._id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let hotelData = new FormData()
        hotelData.append('title', values.title);
        hotelData.append('content', values.content);
        hotelData.append('location', values.location);
        hotelData.append('price', values.price);
        image && hotelData.append('image', image);
        hotelData.append('from', values.from);
        hotelData.append('to', values.to);
        hotelData.append('bed', values.bed);

        console.log([...hotelData]);

        try {
            let editedHotel = updateHotel(auth.token, hotelData, hotelId);
            console.log("hotel update", editedHotel)
            toast.info('Hotel details updated')
        } catch (error) {
            console.log(error)
            // toast.info(error.response.data.error)
        }
        
    }


    const handleImageChange = (e) => {
        //console.log(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        setValues(previousValues => ({ ...previousValues, from: dateStrings[0] }));
        setValues(previousValues => ({ ...previousValues, to: dateStrings[1] }));
    };

    return (
        <>
            {/* <div className='container-fluid bg-light p-3 text-center'>
                <h5>Edit Hotel</h5>
            </div> */}
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-10'>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label className='btn btn-outline-secondary btn-block m-2 text-left'>
                                    <input type='file'
                                        name='image'
                                        onChange={handleImageChange}
                                        accept='image/*' hidden />
                                    Image
                                </label>

                                <input type='text'
                                    name='title'
                                    onChange={handleChange}
                                    placeholder='Title'
                                    className='form-control m-2'
                                    value={values.title} />

                                <textarea
                                    name='content'
                                    onChange={handleChange}
                                    placeholder='Content'
                                    className='form-control m-2'
                                    value={values.content} />

                                {values.location && values.location.length &&

                                <Autocomplete
                                    type="text"
                                    className="form-control m-2"
                                    placeholder="Location"
                                    apiKey={process.env.REACT_APP_PLACES_API_KEY}
                                    onPlaceSelected={(place) => {
                                        setValues(...values, {location: place?.formatted_address});
                                      }}
                                    //   options={{
                                    //     types: ["(regions)"],
                                    //     componentRestrictions: { country: "us" },
                                    //   }}
                                      defaultValue={values.location}
                                    style={{ height: "50px" }}
                                />
                            }

                                <input type='number'
                                    name='price'
                                    onChange={handleChange}
                                    placeholder='Price'
                                    className='form-control m-2'
                                    value={values.price} />

                                <Select className='w-100 m-2' size='large'
                                    labelInValue
                                    placeholder='Number of beds'
                                    value={values.bed}
                                    onChange={(selection) =>
                                        setValues({ ...values, bed: selection.value })}>
                                    <Option value={1}>1</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={3}>3</Option>
                                    <Option value={4}>4</Option>
                                </Select>
                            </div>
                            {values.from  &&
                                <Space direction="vertical" size={12}>
                                    <RangePicker
                                        defaultValue={moment(values.from, 'YYYY-MM-DD')}
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        onChange={onChange}
                                        disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
                                    />
                                </Space>
                            }
                            <button className='btn btn-outline-danger m-2'>Save</button>
                        </form>
                    </div>

                    <div className='col-md-2'>
                        <img className='img img-fluid m-2' src={preview} alt='preview' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditHotel;