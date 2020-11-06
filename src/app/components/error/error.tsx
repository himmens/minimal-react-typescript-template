import React from 'react';
import styles from './error.css';

type Props = {
    retrying?: boolean,
    onRetry: () => void
};

export default function Error({ onRetry }: Props): JSX.Element {
    return (
        <div className={styles.root}>
            <div className={styles.message}>
                <div className={styles.title}>
                    {'Error'}
                </div>
                <div className={styles.description}>
                    {'Error with getting data from server'}
                </div>
                <button onClick={onRetry}>
                    {'Retry'}
                </button>
            </div>
        </div>
    );
}
