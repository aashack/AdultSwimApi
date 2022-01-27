import httpStatusCodes from "http-status-codes";

class ResponseBody {
    constructor(statusCode = httpStatusCodes.BAD_GATEWAY, message = "Error") {
        this.statusCode = statusCode;
        this.message = message;
    }

    getResponse() {
        return {
            statusCode: this.statusCode,
            message: this.message
        };
    }
}

class Success extends ResponseBody {
    constructor(data, message = "SUCCESS") {
        super(httpStatusCodes.OK, message);
        return this.getResponse(data);
    }

    getResponse(data) {
        return {
            ...super.getResponse(),
            data
        };
    }
}

class Created extends ResponseBody {
    constructor(data, message = "CREATED") {
        super(httpStatusCodes.CREATED, message);
        return this.getResponse(data);
    }

    getResponse(data) {
        return {
            ...super.getResponse(),
            data
        };
    }
}

class NotFoundError extends ResponseBody {
    constructor(errors = [], message = "NOT FOUND") {
        super(httpStatusCodes.NOT_FOUND, message);
        return this.getResponse(errors);
    }

    getResponse(errors) {
        return {
            ...super.getResponse(),
            errors
        };
    }
}

class BadRequestError extends ResponseBody {
    constructor(errors = [], message = "BAD REQUEST") {
        super(httpStatusCodes.BAD_REQUEST, message);
        return this.getResponse(errors);
    }

    getResponse(errors) {
        return {
            ...super.getResponse(),
            errors
        };
    }
}

class ForbiddenError extends ResponseBody {
    constructor(errors = [], message = "FORBIDDEN") {
        super(httpStatusCodes.FORBIDDEN, message);
        return this.getResponse(errors);
    }

    getResponse(errors) {
        return {
            ...super.getResponse(),
            errors
        };
    }
}

class ValidationError extends ResponseBody {
    constructor(error, message = "VALIDATION ERROR") {
        super(httpStatusCodes.BAD_REQUEST, error.name || message);
        const errors = error.errors.map(e => ({ message: e.message, type: e.type, path: e.path, value: e.value }));
        return this.getResponse(errors);
    }

    getResponse(errors) {
        return {
            ...super.getResponse(),
            errors
        };
    }
}

export default {
    Success,
    Created,
    NotFoundError,
    BadRequestError,
    ForbiddenError,
    ValidationError
};
