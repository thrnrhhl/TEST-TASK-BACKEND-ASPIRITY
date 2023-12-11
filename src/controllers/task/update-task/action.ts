import { Request, Response } from "express";
import mongoose from "mongoose";
import { Task } from "../../../models";
import { ReqBody, schema } from "./config";

export const updateTask = async (req: Request<{}, {}, ReqBody>, res: Response) => {
    try {
        // Валидация данных
        await schema.validate(req.body);

        // Поиск документа который будем обновлять
        const taskDocument = await Task.findOne({ _id: req.body.id });

        // Если документ не найден
        if(!taskDocument) {
            return res.status(404).json({
                ok: 0,
                message: 'Документ не найден'
            })
        }
        
        // Обновление документа
        const updateDocument = await Task.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.body.id) },
            { description: req.body.description },
            { new: true }
        );

        // Отправка клиенту
        return res.status(200).json({
            ok: 1,
            data: {
                id: updateDocument?.id,
                description: updateDocument?.description,
            }
        })

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            ok: 0,
            message: 'проищошла ошибка при обновлении задачи'
        });
    }
};