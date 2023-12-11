import mongoose from "mongoose";

const neww = mongoose.Schema({
    some: Number,
},
    {
        timestamps: true,
    }
)



export const newclc = mongoose.model('new', neww)