import * as React from 'react';
import '../style/main';
import { Router } from './Router';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import ErrorBoundary from './ErrorBoundary';

export default class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return <AppContainer>
            <Provider store={store}>
                <ErrorBoundary>
                    <Router />
                </ErrorBoundary>
            </Provider>
        </AppContainer>;
    }
}