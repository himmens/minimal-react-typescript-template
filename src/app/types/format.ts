import type { ReactNode } from 'react';
import type { IntlShape } from 'react-intl';

export type MessageFormatterValues = {
    [key: string]: unknown
};

export type MessageFormatterProps = {
    id: string,
    dataMarker?: string,
    className?: string,
    children?: (...message: Array<string>) => ReactNode,
    description?: string,
    defaultMessage?: string,
    values?: MessageFormatterValues
};

export type NumberFormatOptions = {
    localeMatcher?: 'best fit' | 'lookup',
    style?: 'decimal' | 'currency' | 'percent',
    currency?: string,
    currencyDisplay?: 'symbol' | 'code' | 'name',
    useGrouping?: boolean,
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number
};

export type NumberFormatterProps = {
    id?: string,
    dataMarker?: string,
    className?: string,
    locale?: string,
    currency?: string,
    value: string | number,
    detectFraction?: boolean,
    format?: string,
    options?: NumberFormatOptions
};

export type FormatNumberProps = {
    intl: IntlShape,
    value: string | number,
    options?: NumberFormatOptions,
    detectFraction?: boolean
};
