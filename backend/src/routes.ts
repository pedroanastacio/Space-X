import { Router } from 'express'
import { DefaultController } from './controllers/DefaultController'

export const routes = Router()

const defaultController = new DefaultController()

routes.get('/', defaultController.handle)
