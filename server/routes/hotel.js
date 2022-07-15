import express from 'express';
import formidable from 'express-formidable';
import { createHotel, hotels, image, sellerHotels, removeHotel, 
    view, update, userHotelBookings, alreadyBooked, searchListing } from '../controllers/hotel';

const router = express.Router();

//middleware for signed in user only
import { requireSignin, hotelOwner } from '../middlewares'

router.post("/createhotel", requireSignin, formidable(), createHotel)

router.get('/hotels', hotels)
router.get('/hotel/image/:id', image)
router.get('/sellerhotels', requireSignin, sellerHotels)
router.delete('/deletehotel/:hotelId', requireSignin, hotelOwner, removeHotel)
router.get('/hotel/:hotelId', view)
router.put('/updatehotel/:hotelId', requireSignin, hotelOwner, formidable(), update)
router.get('/userbookings', requireSignin, userHotelBookings)
router.get('/alreadybooked/:hotelId', requireSignin, alreadyBooked)
router.post('/searchlisting', searchListing)

module.exports = router;