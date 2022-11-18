import { RocketModel } from '../models/RocketModel'
import { LaunchModel } from '../models/LaunchModel'
import { CronJob } from 'cron'
import fetch from 'cross-fetch'

export const NewLaunchesJob = new CronJob('0 0 9 * * *', async () => {
    try {
        const launchesResponse = await fetch(`${process.env.SPACE_X_API_URL}/launches`)

        if (launchesResponse.status >= 400) {
            throw new Error('Bad response from server when requesting launches data.')
        }

        const launchesReceivedFromApi = await launchesResponse.json()
        const numberOfLaunchesReceivedFromApi = launchesReceivedFromApi.length

        const numberOfLaunchesOnDatabase = (await LaunchModel.find()).length

        if (numberOfLaunchesReceivedFromApi > numberOfLaunchesOnDatabase) {
            const newLaunchesResponse = await fetch(`${process.env.SPACE_X_API_URL}/launches/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "options": {
                        "limit": numberOfLaunchesReceivedFromApi - numberOfLaunchesOnDatabase,
                        "sort": {
                            "flight_number": "desc"
                        }
                    }
                })
            })

            if (newLaunchesResponse.status >= 400) {
                throw new Error('Bad response from server when requesting new launches data.')
            }

            const newLaunches = (await newLaunchesResponse.json()).docs
            const newLaunchesCount = newLaunches.length
            let newLaunchesToBeSaved = newLaunches.length

            let newRocketsCount = 0
           
            await newLaunches.map(async (launch: any) => {
                let savedRocket = await RocketModel.findById(launch.rocket)

                if (!savedRocket) {
                    const newRocketResponse = await fetch(`${process.env.SPACE_X_API_URL}/rockets/${launch.rocket}`)
                    
                    if (newRocketResponse.status >= 400) {
                        throw new Error('Bad response from server when requesting new rocket data.')
                    }
                    
                    const newRocket = await newRocketResponse.json()
                    
                    savedRocket = await RocketModel.create({
                        _id: newRocket.id,
                        name: newRocket.name
                    })

                    newRocketsCount++
                }

                await LaunchModel.create({
                    name: launch.name,
                    flight_number: launch.flight_number,
                    patch: launch.links.patch.small,
                    date: launch.date_utc,
                    rocket: savedRocket,
                    success: launch.success,
                    webcast: launch.links.webcast  
                })

                newLaunchesToBeSaved--

                if (newLaunchesToBeSaved === 0) {
                    console.log(`Database successfully updated. ${newRocketsCount} rockets and ${newLaunchesCount} launches were inserted.`)
                }
            })

        } else {
            console.log('No new launches to save.')
        }
    } catch (error) {
        console.error(error)
    }
})