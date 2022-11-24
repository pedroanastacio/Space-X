import { Request, Response } from 'express'
import { LaunchModel } from '../models/LaunchModel'

export class LaunchController {

    async find(req: Request, res: Response) {
        const { limit, search, page } = req.query

        const _page = isNaN(Number(page)) ? undefined : Number(page)
        const _limit = isNaN(Number(limit)) ? 5 : Number(limit)

        const customLabels = {
            docs: 'results',
            hasNextPage: 'hasNext',
            hasPrevPage: 'hasPrev',
        }

        const options = {
            ..._page && { page: _page },
            limit: _limit,
            sort: { flight_number: 1 },
            customLabels
        }

        try {
            const aggregate = search ?
                LaunchModel.aggregate([
                    {
                        $lookup: {
                            from: 'rockets',
                            localField: 'rocket',
                            foreignField: '_id',
                            as: 'rocket'
                        }
                    },
                    {
                        $unwind: '$rocket'
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
                :
                LaunchModel.aggregate([
                    {
                        $lookup: {
                            from: 'rockets',
                            localField: 'rocket',
                            foreignField: '_id',
                            as: 'rocket'
                        }
                    },
                    {
                        $unwind: '$rocket'
                    },
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

    async launchesPerRocket(req: Request, res: Response) {
        try {
            const launchesPerRocket = await LaunchModel.aggregate([
                {
                    $lookup: {
                        from: 'rockets',
                        localField: 'rocket',
                        foreignField: '_id',
                        as: 'rocket'
                    }
                },
                {
                    $unwind: '$rocket'
                },
                {
                    $group: {
                        _id: {
                            rocket: '$rocket.name',
                        },
                        count: {
                            $sum: 1
                        },
                    }
                },
                {
                    $project: {
                        rocket: '$_id.rocket',
                        count: 1,
                        _id: 0,
                    }
                },
            ])

            return res.status(200).json({ results: launchesPerRocket })
        } catch {
            return res.status(400).json({ 'message': 'Error message' })
        }
    }

    async launchesPerResult(req: Request, res: Response) {
        try {
            const launchesPerResult = await LaunchModel.aggregate([
                {
                    $group: {
                        _id: '$result',
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $project: {
                        result: '$_id',
                        count: 1,
                        _id: 0
                    }
                }
            ])

            return res.status(200).json({ results: launchesPerResult })
        } catch {
            return res.status(400).json({ 'message': 'Error message' })
        }
    }

    async launchesPerYear(req: Request, res: Response) {
        try {
            const result = await LaunchModel.aggregate([
                {
                    $lookup: {
                        from: 'rockets',
                        localField: 'rocket',
                        foreignField: '_id',
                        as: 'rocket'
                    }
                },
                {
                    $unwind: '$rocket'
                },
                {
                    $group: {
                        _id: {
                            year: {
                                $year: {
                                    $toDate: '$date'
                                }
                            },
                            rocket: '$rocket',
                        },
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id.year',
                        count: { $sum: '$count' },
                        rockets: {
                            $push: {
                                k: '$_id.rocket.name',
                                v: '$count'
                            }
                        }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }, 
                {
                    $project: {
                        result: {
                            $mergeObjects: [
                            { year: '$_id' },
                            { 
                                $arrayToObject: '$rockets'  
                            },
                        ]
                        },   
                        rockets: '$rockets'      ,            
                        _id: 0
                    }
                }
            ])

            const launchesPerYear = result.map(item => {
                return {...item.result}
            })

            return res.status(200).json({ results: launchesPerYear })
        } catch {
            return res.status(400).json({ 'message': 'Error message' })
        }
    }
}