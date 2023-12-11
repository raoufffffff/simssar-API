import experss from 'express'
import { locals } from '../model/local'
const favortRoute = experss.Router()

favortRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const fave = await locals.findById(id)
        if (!fave) return res.status(404).send({ message: "not found" })
        res.status(202).json(fave)
    } catch (error) {
        res.status(400).send({ message: error })
    }
})


favortRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const fave = await locals.findById(id)
        if (!fave) return res.status(404).send({ message: "not found" })
        res.status(202).json(fave)
    } catch (error) {
        res.status(400).send({ message: error })
    }
})