import axios from 'axios';

export const createHotel = async (token, data) => 
await axios.post('/createhotel', data, 
{
    headers: {
        Authorization: `Bearer ${token}`
    }
}
);

export const allHotels = async () => 
    await axios.get('/hotels')


//get no of days the hotel is available
export const days = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from)
    const end = new Date(to)
    const diff = Math.round(Math.abs((start - end) / day));
    return diff;
}

export const sellerHotels = async (token) => 
await axios.get('/sellerhotels', {
headers: {
    Authorization: `Bearer ${token}`
}
}) 

export const deleteHotel = async (token, hotelId) => 
await axios.delete(`/deletehotel/${hotelId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const view = async (hotelId) => 
await axios.get(`/hotel/${hotelId}`)

export const updateHotel = async (token, data, hotelId) => 
await axios.put(`/updatehotel/${hotelId}`, data, 
{
    headers: {
        Authorization: `Bearer ${token}`
    }
}
);

export const userHotelBookings = async (token) =>
await axios.get('/userbookings', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const alreadyBooked = async (token, hotelId) => 
await axios.get(`/alreadybooked/${hotelId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const searchListing = async (query) => 
await axios.post('/searchlisting', query)