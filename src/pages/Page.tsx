import * as React from 'react';

interface IProps {
    page: string;
}

export default class Page extends React.Component<IProps, any> {
    public render(): React.ReactNode {
        return <div className={`page page--${this.props.page}`}>
            {this.props.children}
        </div>;
    }
}