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

    async countLaunchesPerRocket(req: Request, res: Response) {
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
                            rocket: '$rocket',
                            result: '$result',
                        },
                        count: {
                            $sum: 1
                        },
                    }
                },
                {
                    $group: {
                        _id: '$_id.rocket',
                        count: { $sum: '$count' },
                        result: {
                            $push: {
                                _id: '$_id.result',
                                count: '$count'
                            }
                        }
                    }
                }
            ])

            const launchesPerRocket = result.map(item => {
                return {
                    rocket: item._id,
                    count: item.count,
                    result: item.result
                }
            })

            return res.status(200).json({ results: launchesPerRocket })
        } catch {
            return res.status(400).json({ 'message': 'Error message' })
        }
    }

    async countLaunchesPerRocketPerYear(req: Request, res: Response) {
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
                                _id: '$_id.rocket',
                                count: '$count'
                            }
                        }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                },
            ])

            const launchsPerRocketPerYear = result.map(item => {
                return {
                    year: item._id,
                    count: item.count,
                    rockets: item.rockets.map((rocket: any) => {
                        return {
                            rocket: {
                                _id: rocket._id._id,
                                name: rocket._id.name,
                            },
                            count: rocket.count
                        }
                    })
                }
            })

            return res.status(200).json({ results: launchsPerRocketPerYear })
        } catch {
            return res.status(400).json({ 'message': 'Error message' })
        }
    }
}