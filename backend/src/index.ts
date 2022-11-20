import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { routes } from './routes'
import { MongoConnection } from './database/MongoConnection'
import { PopulateDatabase } from './scripts/PopulateDatabase'
import { NewLaunchesJob } from './scripts/NewLaunchesCron'
import swaggerFile from './swagger/swagger_output.json'

dotenv.config({ path: `.env.${process.env.NODE_ENV}`})

const PORT = process.env.NODE_PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const db = new MongoConnection()
db.connect()

const populateDatabase = new PopulateDatabase()
populateDatabase.exec()

NewLaunchesJob.start()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))