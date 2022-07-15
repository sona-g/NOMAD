import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Search from '../../components/Search';
import { searchListing } from '../../actions/hotel';
import HotelCard from '../../components/HotelCard'

const SearchResult = () => {
    const [hotels, setHotels] = useState([]);

    //send to backend
    useEffect(()=> {
    const {location, date, bed} = queryString.parse(window.location.search)
    console.log({location, date, bed});
        searchListing({location, date, bed}).then(res => {
            console.log('searchresult', res.data)
            // setHotels(res.data)
        })
    }, [])

    return (
        <>
        
        <div className='col'>
        <Search />
        </div>
        <div className='container'>
            <div className='row'>
        {/* {JSON.stringify(hotels, null, 4)} */}
        {hotels.map((each) => {
            return(
                <HotelCard key={each.id} each={each}/>
            )
        })}
            </div>
        </div>
        </>
    );
};

export default SearchResult;