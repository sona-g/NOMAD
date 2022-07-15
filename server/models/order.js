import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    hotel: {type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    session: {},
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
{timestamps: true }
)

export default mongoose.model('Order', orderSchema)