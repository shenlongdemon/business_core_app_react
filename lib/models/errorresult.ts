export interface ErrorResult {
    httpCode: number;
    businessCode: number;
    message: string;
    error: any;
    __debug: any;
}