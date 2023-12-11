import * as Yup from 'yup';
import { ITask } from '../../../models';


export const schema = Yup.object().shape({
    id: Yup.string(),
    description: Yup.string()
});


export interface ReqBody extends Pick<ITask, 'id' | 'description'> {}