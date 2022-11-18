import mongoose, { Schema } from 'mongoose'
import { Rocket } from './RocketModel'

export interface Launch {
    name: string
    flight_number: number
    patch: string
    date: string
    rocket: Rocket | string
    success: string
    webcast: string
}

const LaunchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flight_number: { type: Number, required: true },
    patch: { type: String },
    date: { type: String, required: true },
    rocket: { type: Schema.Types.ObjectId, ref: 'Rocket' },
    sucess: { type: Boolean },
    webcast: { type: String }
})

export const LaunchModel = mongoose.model('Launch', LaunchSchema)