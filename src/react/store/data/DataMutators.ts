import { IDataState } from './DataReducer';
import { IData } from './IData';

export const _setData = (state: IDataState, data: IData): IDataState => {
    return {
        ...state,
        ...data
    };
};