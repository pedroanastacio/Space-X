import { prop, getModelForClass } from '@typegoose/typegoose'

export class Rocket {
    @prop()
    public _id!: string

    @prop()
    public name!: string
}

export const RocketModel = getModelForClass(Rocket)