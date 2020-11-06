import React, { PureComponent } from 'react';
import api from 'app/api';
import { REQUEST } from 'app/constants';
import Loading from 'app/components/loading/loading';
import Error from 'app/components/error/error';
import type { ReactNode } from 'react';
import type { ResponseError } from 'app/types';
import styles from './app.css';
import { DataResponse } from 'app/types';

type State = {
    state: string,
    error: ResponseError | null,
    data: string
};

export default class AppContainer extends PureComponent<{}, State> {
    state = {
        state: REQUEST.INITIAL,
        error: null,
        data: null
    };

    componentDidMount() {
        this.getData();
    }

    render(): ReactNode {
        const { state } = this.state;

        if (state === REQUEST.LOADING) {
            return this.renderLoading();
        }

        if (state === REQUEST.ERROR) {
            return this.renderError();
        }

        return (
            <div className={styles.root}>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }

    renderHeader(): ReactNode {
        return (
            <div className={styles.header}>
                {'Minimal react typescript application'}
            </div>
        );
    }

    renderBody(): ReactNode {
        const { data } = this.state;

        if (!data) {
            return null;
        }

        return (
            <div className={styles.body}>
                {data}
            </div>
        );
    }

    renderLoading(): ReactNode {
        return <Loading />;
    }

    renderError(): ReactNode {
        const onRetry = () => {
            this.getData();
        };

        return (
            <Error onRetry={onRetry} />
        );
    }

    getData() {
        this.setState({ state: REQUEST.LOADING });

        api.getData()
            .then((response: DataResponse) => {
                this.setState({ state: REQUEST.SUCCESS, data: response.value });
            })
            .catch((error: ResponseError) => {
                this.setState({ state: REQUEST.ERROR, error });
            });
    }
}
