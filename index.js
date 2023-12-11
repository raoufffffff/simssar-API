import express from "express"
import mongoose from "mongoose"
import cors from 'cors';
import OffersRaouter from "./Routes/OffersRouer.js";
import UserRaouter from "./Routes/UserRout.js";
import LocalsRaouter from "./Routes/LocalsRouts.js";
import LogRaouter from "./model/auth/loge.js";
import emailRaouter from "./Routes/email.js";
const app = express()
app.use('/images', express.static('images'));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());
app.use('/local', LocalsRaouter)
app.use('/offer', OffersRaouter)
app.use('/loge', LogRaouter)
app.use('/email', emailRaouter)
app.use('/', UserRaouter)

const PORT = process.env.PORT || 5000


app.listen(PORT)




mongoose
    .connect('mongodb+srv://raouf:raouf@cluster0.ylmy8ks.mongodb.net/')
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))

