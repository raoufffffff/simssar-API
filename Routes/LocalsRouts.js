import express from "express";
import { locals } from "../model/local.js";
import { users } from "../model/user.js";
import multer from "multer";
import pLimit from "p-limit";
import cloudinary from 'cloudinary'
const mycloudinart = cloudinary.v2
const Limit = pLimit(7)


mycloudinart.config({
    cloud_name: "doavete9j",
    api_key: 189645461774396,
    api_secret: "ep5N0vRREBi6wzSK_qRp4fJusT0",
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })


const LocalsRaouter = express.Router()

LocalsRaouter.get("/", async (req, res) => {
    try {
        const a = await locals.find()

        res.status(200).json(a)
    } catch (error) {
        res.status(404).json(error)
    }
})


LocalsRaouter.post("/", upload.array('file'), async (req, res) => {
    const NewLocal = req.body
    let id = req.body.OwnerId
    const imges = req.files.map(r => {
        return r.path
    })
    console.log(imges);
    let b = [];
    for (let i = 0; i < imges.length; i++) {
        const result = await cloudinary.uploader.upload(imges[i])
        console.log(`Successfully uploaded ${imges[i]}`);
        console.log(`> Result: ${result.secure_url}`);
        b.push(result.secure_url)
    }
    try {
        NewLocal.img = b;
        console.log(b);
        const owner = await users.findById(id)
        const a = await locals.create(NewLocal)
        owner.mylocal.push(a.id)
        const update = await users.findByIdAndUpdate(owner.id, owner)
        res.status(200).json(a)
    } catch (error) {
        res.status(404).json(error)
    }
})



LocalsRaouter.delete('/:id', async (req, res) => {
    let { id } = req.params
    try {
        const b = await locals.findById(id)
        const owner = await users.findById(b.OwnerId)
        owner.mylocal = owner.mylocal.filter(e => e === id ? null : e)
        const update = await users.findByIdAndUpdate(owner.id, owner)
        const a = await locals.findByIdAndDelete(id)
        if (!a) {
            return res.status(404).json({ message: 'local not found' });

        }
        res.status(200).send({ message: 'local deleted successfully' });
    } catch (error) {
        res.send({ message: error.message })
    }

})

LocalsRaouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const local = await locals.findById(id)
        if (!local) { return res.status(404).send({ message: 'local not found' }) }
        res.status(200).json(local)
    } catch (error) {
        res.send({ message: error.message })
    }
})




export default LocalsRaouter