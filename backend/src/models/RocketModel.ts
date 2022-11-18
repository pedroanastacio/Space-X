import mongoose from 'mongoose'

export interface Rocket {
    _id: string
    name: string
}

const RocketSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true }
})

export const RocketModel = mongoose.model('Rocket', RocketSchema)
