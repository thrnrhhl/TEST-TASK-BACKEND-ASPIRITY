import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
    description: string;
}

const schema = new mongoose.Schema<ITask>({
    description: String
}, {
    timestamps: true
});

export const Task = mongoose.model('Task', schema);