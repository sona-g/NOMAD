import React, { useState } from 'react';
import { DatePicker, Space, Select } from 'antd';
import moment from 'moment';
import { createHotel } from '../../actions/hotel';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Autocomplete from 'react-google-autocomplete';


const { Option } = Select;
const { RangePicker } = DatePicker;

const NewHotel = () => {
    const { auth } = useSelector((state) => ({ ...state }))

    const [values, setValues] = useState({
        title: "",
        content: "",
        image: "",
        price: "",
        from: "",
        to: "",
        bed: ""
    })

    const [preview, setPreview] = useState('http://via.placeholder.com/100.png?text=PREVIEW');
    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values)
        // console.log(location)

        let hotelData = new FormData()
        hotelData.append('title', values.title);
        hotelData.append('content', values.content);
        hotelData.append('location', location);
        hotelData.append('price', values.price);
        values.image && hotelData.append('image', values.image);
        hotelData.append('from', values.from);
        hotelData.append('to', values.to);
        hotelData.append('bed', values.bed);

        console.log([...hotelData]);

        try {
            let hotelSave = createHotel(auth.token, hotelData)
            console.log("NEW HOTEL POSTED", hotelSave)
            toast.info("New hotel is listed")

            setTimeout(() => {
                window.location.reload()
            }, 2000);

        } catch (error) {
            console.log(error)
            toast.info(error.response.data)
        }
    }

    const handleImageChange = (e) => {
        //console.log(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
        setValues({ ...values, image: e.target.files[0] })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChange = (dates, dateStrings) => {
          console.log('From: ', dates[0], ', to: ', dates[1]);
          setValues(previousValues => ({...previousValues, from: dateStrings[0]}));
          setValues(previousValues => ({...previousValues, to: dateStrings[1]}));
      };

    return (
        <>
            {/* <div className="container-fluid bg-light p-3 text-center" >
                <h5>Add new hotel</h5>
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

                                <Autocomplete
                                    type="text"
                                    className="form-control m-2"
                                    placeholder="Location"
                                    apiKey={process.env.REACT_APP_PLACES_API_KEY}
                                    onPlaceSelected={(place) => {
                                        setLocation(place?.formatted_address);
                                      }}
                                    //   options={{
                                    //     types: ["(regions)"],
                                    //     componentRestrictions: { country: "us" },
                                    //   }}
                                      defaultValue="Singapore"
                                    style={{ height: "50px" }}
                                />

                                <input type='number'
                                    name='price'
                                    onChange={handleChange}
                                    placeholder='Price'
                                    className='form-control m-2'
                                    value={values.price} />

                                <Select className='w-100 m-2' size='large'
                                    labelInValue
                                    placeholder='Number of beds'
                                    onChange={(selection) =>
                                        setValues({ ...values, bed: selection.value })}>
                                    <Option value={1}>1</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={3}>3</Option>
                                    <Option value={4}>4</Option>
                                </Select>
                            </div>
                            <Space direction="vertical" size={12}>
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    onChange={onChange}
                                    disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
                                />
                            </Space>

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

export default NewHotel;