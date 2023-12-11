import express from "express";
import { users } from "../model/user.js";
const emailRaouter = express.Router()


emailRaouter.post('/', async (req, res) => {
    try {
        const user = await users.find()
        const a = user.find(e => e.email == req.body.email)
        if (!a) return res.status(404).send("9ooooowed")
        res.status(200).json(a)
    } catch (error) {
        res.status(404).send(error)
    }
})


emailRaouter.get('/', async (req, res) => {
    try {
        res.status(201).json("a")
    } catch (error) {
        res.status(404).send(error)
    }
})


export default emailRaouter
