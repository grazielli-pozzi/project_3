import bcrypt from 'bcrypt';

class PasswordUtils {
    constructor() {
        this.bcrypt = bcrypt;
        this.saltRounds = 10;
    }

    encrypt(textPassword) {
        // const salt = await this.bcrypt.genSalt(this.saltRounds);

        return this.bcrypt.hashSync(textPassword, this.saltRounds);
    }
}

export default new PasswordUtils();
