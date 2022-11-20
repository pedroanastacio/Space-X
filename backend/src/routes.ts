import { Router } from 'express'
import { DefaultController } from './controllers/DefaultController'
import { LaunchController } from './controllers/LaunchController'

export const routes = Router()

const defaultController = new DefaultController()
const launchController = new LaunchController()

routes.get('/', defaultController.handle)
routes.get('/launches', launchController.find)
routes.get('/launches/stats-per-rocket', launchController.countLaunchesPerRocket)
routes.get('/launches/stats-per-rocket-per-year', launchController.countLaunchesPerRocketPerYear)

