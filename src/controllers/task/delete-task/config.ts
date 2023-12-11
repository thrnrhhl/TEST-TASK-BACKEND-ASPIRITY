import { ITask } from "../../../models";
import * as Yup from 'yup';

export interface ReqBody extends ITask {}

export const schema = Yup.array(Yup.string());