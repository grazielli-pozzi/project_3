class ApplicationError extends Error {
    constructor(params) {
        super();
        
        this.message = params.message || 'An error ocurred. Please try again later';
        this.type = params.type || 'Application error';
        this.status = params.status || 500;
    }
}

export default ApplicationError;
