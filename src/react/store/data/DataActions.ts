import { IData } from './IData';
import { ICreatedAction } from '../../actions/IAction';
import { ActionType } from '../../actions/ActionType';

export const setDataAction = (data: IData): ICreatedAction<ActionType.SET_DATA, IData> => ({
    type: ActionType.SET_DATA,
    payload: data
});