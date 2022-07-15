import Hotel from '../models/hotel';
import fs from 'fs';
import Order from '../models/order';


export const createHotel = async (req, res) => {
    // console.log('req.fields', req.fields);
    // console.log('req.files', req.files)
    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);
        hotel.postedBy = req.user._id;
        console.log("user", hotel.postedBy)
        //handle image (make it sync)
        if (files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type
        }
        hotel.save((error, result) => {
            if (error) {
                console.log('saving hotel error', error);
                res.status(400).send("Error listing the hotel")
            }
            res.json(result)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const hotels = async (req, res) => {
    let allHotels = await Hotel.find({ from: { $gte: new Date() } })
        .limit(30)
        .select("-image.data")
        .populate("postedBy").exec();
    console.log(allHotels);
    res.json(allHotels);
}

export const image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.id).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set("Content-Type", hotel.image.contentType);
        return res.send(hotel.image.data)
    }
}

export const sellerHotels = async (req, res) => {
    let sellerHotels = await Hotel.find({ postedBy: req.user._id })
        .select('-image.data')
        .populate('postedBy', '_id name').exec();
    console.log(sellerHotels);
    res.send(sellerHotels);
}

export const removeHotel = async (req, res) => {
    let remove = await Hotel.findByIdAndDelete(req.params.hotelId).exec()
    res.json({ status: "success", data: remove })
}

export const view = async (req, res) => {
    let viewAll = await Hotel.findById(req.params.hotelId)
        .populate("postedBy", "_id name")
        .select('-image.data').exec()
    console.log("VIEW HOTEL", viewAll)
    res.json(viewAll)
}

export const update = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        let updated = { ...fields };
        //handle image
        if (files.image) {
            let image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;

            updated.image = image
        }
        // console.log(updated);
        // console.log(image);

        let edited = await Hotel.findByIdAndUpdate(req.params.hotelId, updated, { new: true }).select("-image.data")
        res.json(edited)
    } catch (error) {
        console.log(error)
        res.status(400).send("Hotel update failed")
    }
}

export const userHotelBookings = async (req, res) => {
    const all = await Order.find({ orderedBy: req.user._id })
        .select('session')
        .populate('hotel', '-image.data')
        .populate('orderedBy', '_id name')
        .exec();
    console.log(all)
    res.json(all);
}

export const alreadyBooked = async (req, res) => {
    const { hotelId } = req.params;
    // find orders of current user
    const userOrders = await Order.find({ orderedBy: req.user._id })
        .select('hotel')
        .exec()

    //check if hotel id is found in user - orders array
    let ids = []
    for (let i = 0; i < userOrders.length; i++) {
        ids.push(userOrders[i].hotel.toString());
    }
    res.json({ ok: ids.includes(hotelId) })
}

export const searchListing = async (req, res) => {
    const { location, date, bed } = req.body;
    //console.log(location, date, bed);
    //console.log(date);
    const fromDate = date.split(",")
    console.log(fromDate)
    let result = await Hotel.find({
        from: { $gte: new Date(fromDate[0]) },
        to: {$lte: fromDate[1]}, 
        location, bed
    })
        .select("-image.data")
        .exec();
    res.json(result);
}