import { Request, Response } from 'express';

export class DefaultController {
    
    async handle(req: Request, res: Response) {
        const message = 'Fullstack Challenge 🏅 - Space X API'

        return res.status(200).json({ message })
    }
}