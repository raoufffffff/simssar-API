import mongoose from "mongoose";

const offer = mongoose.Schema({
    body: String,
    price: Number,
    LocalId: String,
    offersId: String,
    ownerId: String,
},
    {
        timestamps: true,
    }
)

export const offres = mongoose.model('offer', offer)