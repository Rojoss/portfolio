import * as React from 'react';
import Page from '../Page';

export default class Home extends React.Component<any, any> {
    public render(): JSX.Element {
        return <Page page={'home'}>
            <h1>Jos Roossienn</h1>
        </Page>;
    }
}