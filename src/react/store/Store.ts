import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionType } from '../actions/ActionType';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IDataState, dataReducer } from './data/DataReducer';
import { history } from '../History';

const actionTypeEnumToString = (action: any): any => typeof action.type === 'number' && ActionType[action.type] ? ({
    type: ActionType[action.type],
    payload: action.payload,
}) : action;
const composeEnhancers = composeWithDevTools({ actionSanitizer: actionTypeEnumToString });

export const store = createStore(
    combineReducers({
        router: connectRouter(history),
        data: dataReducer,
    }),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        ),
    ),
);

export interface IRootState {
    data: IDataState;
}

export function GetState(): IRootState {
    return (store.getState() as any) as IRootState;
}