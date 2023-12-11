import { Request, Response } from "express";
import { Task } from "../../../models";
import { schema } from "./config";

export const addTask = async (req: Request, res: Response) => {
    try {

        // Валидируем данные
        await schema.validate(req.body);

        // Созданием новую задачу
        const newDocument = await Task.create({
            description: req.body.description,
        });

        // Отправляем ответ
        return res.status(200).json({
            ok: 1,
            data: {
                id: newDocument.id,
                description: newDocument.description,
            }
        })

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            ok: 0,
            message: 'Произошла ошибка при создании задачи'
        })
    }
};