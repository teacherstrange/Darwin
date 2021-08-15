export class ErrorMiddleware extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ErrorMiddleware.prototype);
    }
}

export class FooError extends Error {
    constructor(m: string) {
        super(m);
        console.log(m)
        Object.setPrototypeOf(this, FooError.prototype);
    }
}