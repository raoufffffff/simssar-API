import express from "express";
import { users } from "../model/user.js";
import { newclc } from "../model/new.js";
const UserRaouter = express.Router()



UserRaouter.post("/", async (req, res) => {
    const NewUser = req.body
    try {
        const allusers = await users.find()
        if (allusers.find(e => e.email === NewUser.email)) return res.status(200).json({ erremail: 'email is already used' })
        const a = await users.create(NewUser)
        res.status(200).json({ ok: 'ok' })
    } catch (error) {
        res.status(404).json({ "message": `${error}` })
    }
})

UserRaouter.get("/", async (req, res) => {
    try {
        const a = await users.find()
        res.status(200).json(a)
    } catch (error) {
        res.status(404).json(error)
    }
})


UserRaouter.get("/new", async (req, res) => {
    try {
        let id = "6576fde3783ed3070c5948ee"
        let a = await newclc.findById(id)
        a.some = a.some + 1
        const b = await newclc.findByIdAndUpdate(id, a)
        res.status(200).json(b)
    } catch (error) {
        res.status(404).json(error)
    }
})

UserRaouter.get("/newremove", async (req, res) => {
    try {
        let id = "6576fde3783ed3070c5948ee"
        let a = await newclc.findById(id)
        a.some = 0
        const b = await newclc.findByIdAndUpdate(id, a)
        res.status(200).json(b)
    } catch (error) {
        res.status(404).json(error)
    }
})



UserRaouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await users.findById(id)
        if (!user) return res.status(404).send({ message: 'user not found' });
        res.status(200).json(user)
    } catch (error) {
        res.status(404).send(error)
    }
})






UserRaouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const delet = await users.findByIdAndDelete(id)
        if (!delet) return res.status(500).send('not found');
        res.status(201).send('deleted successfully')
    } catch (error) {
        res.status(404).send(error)
    }
})

export default UserRaouter