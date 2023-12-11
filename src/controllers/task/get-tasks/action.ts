import { Request, Response } from "express";
import { Task } from "../../../models";

export const getTasks = async (req: Request, res: Response) => {
    try {
        
        // Получение задач
        const tasks = await Task.aggregate([
            {
                $project: {
                    _id: 0,
                    id: '$_id',
                    description: '$description',
                    createdAt: 1
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);

        return res.status(200).json({
            ok: 1,
            data: tasks
        });

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            ok: 0,
            message: 'Произошла ошибка при получении задач'
        });
    }
};