import jwt from 'jsonwebtoken';

class AuthTolken {
    constructor() {
        this.jwt = jwt;
    }

    verify(token) {
        return this.jwt.verify(token, process.env.TOKEN);
    }
}

export default new AuthTolken();
