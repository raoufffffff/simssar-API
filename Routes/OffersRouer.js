import express from "express";
import { users } from "../model/user.js";
import { offres } from "../model/offer.js";

const OffersRaouter = express.Router()

OffersRaouter.post('/', async (req, res) => {
    let newofer = req.body
    try {
        const postOfer = await offres.create(newofer)
        if (!postOfer) {
            res.status(410).send({ message: "error" })
        }
        res.status(201).json("the offer is posted")
    } catch (error) {
        res.status(400).send({ message: error })
    }
})

OffersRaouter.get("/", async (req, res) => {
    try {
        const offers = await offres.find()
        res.status(200).json(offers)
    } catch (error) {
        res.status(400).send({ "message": `${error}` })
    }
})

OffersRaouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const offers = await offres.findByIdAndDelete(id)
        res.status(200).send({ message: "tje offer is deleted" })
    } catch (error) {
        res.status(400).send({ message: error })
    }
})

OffersRaouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const offer = await offres.findById(id)
        if (!offer) return res.status(404).send({ message: 'offer not found' })
        res.status(200).json(offer)
    } catch (error) {
        res.status(400).send({ message: error })

    }
})


export default OffersRaouter