import { IData } from './IData';
import * as mutator from './DataMutators';
import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';

export interface IDataState extends IData { }

export function getInitialState(): IDataState {
    return {};
}

const handlers: { [index: number]: any } = {
    [ActionType.SET_DATA]: mutator._setData,
};

export function dataReducer(state: IDataState = getInitialState(), action: IAction<any>): IDataState {
    if (handlers[action.type]) {
        return handlers[action.type](state, action.payload);
    }
    return state;
}