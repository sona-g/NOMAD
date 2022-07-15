import React, { useState } from 'react';
import { DatePicker, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import Autocomplete from 'react-google-autocomplete';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Search = () => {
    let navigate = useNavigate()
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [bed, setBed] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate({
            pathname: '/searchresult',
            search: `?location=${location}&date=${date}&bed=${bed}`
        })
    }

    const onChange = (dates, dateStrings) => {
        //console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log(dateStrings)
        setDate(dateStrings);
    };

    return (
        <div className='d-flex pb-4'>
            <div className='w-100'>
                <Autocomplete
                    type="text"
                    className="form-control"
                    placeholder="Where are you going?"
                    apiKey={process.env.REACT_APP_PLACES_API_KEY}
                    onPlaceSelected={(place) => {
                        setLocation(place?.formatted_address);
                    }}
                    defaultValue={location}
                //style={{ height: "50px" }}
                />
            </div>
            <Space direction="vertical" size={12}>
                <RangePicker className='w-100'
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={onChange}
                    disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
                />
            </Space>

            <Select className='w-100' size='large'
                labelInValue
                placeholder='Number of beds'
                onChange={(selection) =>
                    setBed(selection.value)}>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
            </Select>
            <SearchOutlined className='btn btn-outline-danger p-3 btn-square'
                onClick={handleSubmit} />

        </div>
    );
};

export default Search;