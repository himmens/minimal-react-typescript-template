import React from 'react';
import styles from './loading.css';

/**
 * Component to display Loading process (Spinner in the center of the block)
 *
 * @returns {Loading}
 */
export default function Loading(): JSX.Element {
    return (
        <div className={styles.root}>
            <span className={styles.spinner} />
        </div>
    );
}
