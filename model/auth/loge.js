import express from "express";
import { users } from "../user.js";
const LogRaouter = express.Router()


LogRaouter.post('/', async (req, res) => {
    let { password, email } = req.body
    try {
        const allusers = await users.find()
        let targetuser = allusers.find(e => e.email === email)
        if (!targetuser) return res.status(200).json({ erremail: "email is not curct" })
        console.log(targetuser.password, password);
        if (targetuser.password != password) return res.status(200).json({ errpassword: "password is not curcet" })
        res.status(200).json(targetuser)
    } catch (error) {
        res.status(404).send(error)
    }
})


LogRaouter.get('/', async (req, res) => {
    try {
        res.send("log")
    } catch (error) {
        res.status(404).send(error)

    }
})

export default LogRaouter