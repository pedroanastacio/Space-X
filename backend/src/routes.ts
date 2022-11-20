import { Router } from 'express'
import { DefaultController } from './controllers/DefaultController'
import { LaunchController } from './controllers/LaunchController'

export const routes = Router()

const defaultController = new DefaultController()
const launchController = new LaunchController()

routes.get('/', defaultController.handle)
routes.get('/launches', launchController.find)
routes.get('/launches/stats-by-rocket', launchController.countLaunchesByRocket)
routes.get('/launches/stats-by-rocket-per-year', launchController.countLaunchesByRocketPerYear)

