import axios from 'axios';

export const createStripeAccount = async (token) => 
await axios.post("/connectstripe", {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const account = async (token) =>
axios.post("/account", {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const payoutSetting = async (token) => 
await axios.post("/payout", {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const accBalance = async (token) =>
await axios.post("/accountbalance", {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const getSessionId = async (token, hotelId) => 
await axios.post("/stripesession", {hotelId}, 
{
    headers: {
    Authorization: `Bearer ${token}`
}
})

export const stripeSuccessRequest = async (token, hotelId) => 
await axios.post("/stripesuccess", {hotelId},
{
    headers: {
    Authorization: `Bearer ${token}`
}
} )