import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Rocket } from './RocketModel';

export class Launch {
    @prop()
    public name!: string

    @prop()
    public flight_number!: number

    @prop()
    public patch!: string

    @prop()
    public date!: string

    @prop({ ref: () => Rocket, type: () => String })
    public rocket!: Ref<Rocket, string>

    @prop()
    public success!: string

    @prop()
    public webcast!: string
}

export const LaunchModel = getModelForClass(Launch)