export type ResponseState = 'initial' | 'loading' | 'success' | 'error';
export type ResponseErrorData = { [id: string]: unknown };

export type ResponseError = {
    code: string,
    message?: string,
    status?: number,
    data?: ResponseErrorData
};

export type DataResponse = {
    value: string
};
