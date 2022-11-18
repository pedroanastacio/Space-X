import { LaunchModel } from '../models/LaunchModel'
import { Rocket, RocketModel } from '../models/RocketModel'
import fetch from 'cross-fetch'

export class PopulateDatabase {

    async exec() {
        try {
            // checks if the database has already been populated
            const launchesOnDatabase = (await LaunchModel.find()).length

            if (launchesOnDatabase > 0) {
                console.log('Database already populated.')
                return
            }

            // persists the rockets' data
            const rocketsResponse = await fetch(`${process.env.SPACE_X_API_URL}/rockets`)

            if (rocketsResponse.status >= 400) {
                throw new Error('Bad response from server when requesting rockets data.')
            }

            const rockets = await rocketsResponse.json()

            let savedRockets: Rocket[] = []
            let savedRocketsCount = 0

            await rockets.map(async (rocket: any) => {
                const savedRocket = await RocketModel.create({
                    _id: rocket.id,
                    name: rocket.name
                })

                savedRockets.push(savedRocket)
                savedRocketsCount++
            })

            // persists the launches' data
            const launchesResponse = await fetch(`${process.env.SPACE_X_API_URL}/launches`)

            if (launchesResponse.status >= 400) {
                throw new Error('Bad response from server when requesting launches data.')
            }

            const launches = await launchesResponse.json()
            const launchesCount = launches.length
            let launchesToBeSaved = launches.length

            await launches.map(async (launch: any) => {
                const rocket = savedRockets.find(rocket => rocket._id === launch.rocket)

                await LaunchModel.create({
                    name: launch.name,
                    flight_number: launch.flight_number,
                    patch: launch.links.patch.small,
                    date: launch.date_utc,
                    rocket: rocket,
                    success: launch.success,
                    webcast: launch.links.webcast  
                })

                launchesToBeSaved--

                if (launchesToBeSaved === 0) {
                    console.log(`Database successfully populated. ${savedRocketsCount} rockets and ${launchesCount} launches were inserted.`)
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}