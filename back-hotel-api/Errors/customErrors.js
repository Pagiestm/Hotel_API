class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

class AlreadyReservedError extends Error {
    constructor(message) {
        super(message);
        this.name = "AlreadyReservedError";
    }
}

export { NotFoundError, AlreadyReservedError };