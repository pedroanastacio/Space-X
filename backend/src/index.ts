import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { routes } from './routes'
import { MongoConnection } from './database/MongoConnection'
import { PopulateDatabase } from './scripts/PopulateDatabase'
import { NewLaunchesJob } from './scripts/NewLaunchesCron'

dotenv.config({ path: `.env.${process.env.NODE_ENV}`})

const PORT = process.env.NODE_PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const db = new MongoConnection()
db.connect()

const populateDatabase = new PopulateDatabase()
populateDatabase.exec()

NewLaunchesJob.start()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))