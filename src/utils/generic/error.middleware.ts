export class ErrorMiddleware extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ErrorMiddleware.prototype);
    }
}