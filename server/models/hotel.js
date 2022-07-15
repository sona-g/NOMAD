import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true, maxLength: 5000 },
    location: { type: String },
    price: { type: Number, required: true, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { data: Buffer, contentType: String },
    from: { type: Date },
    to: { type: Date },
    bed: { type: Number }
},
{timestamps: true }
)

export default mongoose.model('Hotel', hotelSchema)