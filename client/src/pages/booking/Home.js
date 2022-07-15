import React, { useState, useEffect } from 'react';
import { allHotels } from '../../actions/hotel';
import HotelCard from '../../components/HotelCard';
import Search from '../../components/Search';
import { BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#ffc53d',
    color: '#000000',
    textAlign: 'center',
    fontSize: 14,
  };

const Home = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        displayAllHotels();
    }, []);

    const displayAllHotels = async () => {
        let res = await allHotels();
        setHotels(res.data);
    }

    return (
        <>
        <div
    style={{
      height: '600vh',
      padding: 8,
    }}
  >
    <div className="container-fluid bg-light text-center" >
           
<div className='col'>
                <br />
                <Search />
            </div>
             </div>
            <div className='container-fluid'>
                <br />
                {hotels.map((each) => {
                    return (
                        <HotelCard key={each.id} each={each} />
                    )
                })}
            </div>
            <BackTop>
      <div style={style}><ArrowUpOutlined /></div>
    </BackTop>
  </div>
        </>
    );
};

export default Home;