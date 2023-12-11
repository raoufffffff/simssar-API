import mongoose from "mongoose";

const local = mongoose.Schema({
    titel: String,
    state: String,
    type: String,
    city: String,
    price: Number,
    des: String,
    f: Number,
    typeofsell: String,
    OwnerId: String,
    img: [],
},
    {
        timestamps: true,
    }
)



export const locals = mongoose.model('local', local)