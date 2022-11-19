import mongoose, { Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { Rocket } from './RocketModel'

export interface Launch {
    name: string
    flight_number: number
    patch: string
    date: string
    rocket: Rocket | string
    result: string
    webcast: string
}

const LaunchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flight_number: { type: Number, required: true },
    patch: { type: String },
    date: { type: String, required: true },
    rocket: { type: Schema.Types.ObjectId, ref: 'Rocket', required: true },
    result: { type: String, enum: ['SUCESSO', 'FALHA', 'INDETERMINADO'], required: true },
    webcast: { type: String }
})

LaunchSchema.plugin(aggregatePaginate)

export const LaunchModel = mongoose.model('Launch', LaunchSchema)

