class errorHandling {
    handle(error, req, res, next) {
        const { message, type, status } = error;
        const statusCode = status || 500;

        return res.status(statusCode).json({ message, type: type || '', status: statusCode })
    }

}

export default new errorHandling();