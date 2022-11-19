import { Request, Response } from 'express'
import { LaunchModel } from '../models/LaunchModel'

export class LaunchController {

    async find(req: Request, res: Response) {
        const { limit, search, page } = req.query

        const _page = isNaN(Number(page)) ? undefined : Number(page)
        const _limit = isNaN(Number(limit)) ? undefined : Number(limit)

        const customLabels = {
            docs: 'results',
            hasNextPage: 'hasNext',
            hasPrevPage: 'hasPrev',
        }

        const options = {
            ..._page && { page: _page },
            ..._limit && { limit: _limit },
            sort: { flight_number: 1 },
            customLabels
        }

        try {
            const aggregate = LaunchModel.aggregate([
                {
                    $lookup: {
                        from: 'rockets',
                        localField: 'rocket',
                        foreignField: '_id',
                        as: 'rocket'
                    }
                },
                {
                    $match: {
                        $or: [
                            { 'name': { $regex: search, $options: 'i' } },
                            { 'result': { $regex: search, $options: 'i' } },
                            { 'rocket.name': { $regex: search, $options: 'i' } }
                        ]
                    }
                }
            ])

            const result = await LaunchModel.aggregatePaginate(aggregate, options)

            const {
                results,
                totalDocs,
                page,
                totalPages,
                hasNext,
                hasPrev
            } = result

            return res.status(200).json({
                results,
                totalDocs,
                page,
                totalPages,
                hasNext,
                hasPrev
            })
        } catch {
            return res.status(400).json({ 'message': 'Error message' })
        }

    }
}