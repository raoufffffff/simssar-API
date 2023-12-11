import mongoose from "mongoose";

const user = mongoose.Schema({
    name: String,
    state: String,
    type: String,
    email: String,
    password: String,
    tel: Number,
    mylocal: [],
    myoffers: [],
    offers: [],
},
    {
        timestamps: true,
    }
)

export const users = mongoose.model('users', user)