import { Request, Response } from "express";
import { Task } from "../../../models";
import { ReqBody, schema } from "./config";

export const deleteTask = async (req: Request<{}, {}, ReqBody[]>, res: Response) => {
    try {

        // Валидируем данные
        await schema.validate(req.body);

        // Удаляем задачи
        await Task.deleteMany({ _id: { $in: req.body } });

        // Отправляем ответ
        return res.status(200).json({
            ok: 1,
            data: {}
        })

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            ok: 1,
            message: 'Произошла ошибка при удалении записей'
        })
    }
};