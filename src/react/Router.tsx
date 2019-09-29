import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Home from '../pages/home/Home';
import { history } from './History';

export const Router: React.StatelessComponent = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path={Routes.HOME} component={Home} />
        </Switch>
    </ConnectedRouter>
);

export enum Routes {
    HOME = '/'
}