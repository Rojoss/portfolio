import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Routes } from './Router';
import { history } from './History';

const target = document.getElementById('app-root');

const render = (): void => {
    ReactDOM.render(
        <App />,
        target,
    );
};

if ((module as any).hot) {
    (module as any).hot.accept('./App', () => {
        render();
    });
}

export function renderReact(): void {
    history.push(Routes.HOME);
    render();
}