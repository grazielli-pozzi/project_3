import bcrypt from 'bcrypt';

class PasswordUtils {
    constructor() {
        this.bcrypt = bcrypt;
        this.saltRounds = 10;
    }

    encrypt(textPassword) {
        return this.bcrypt.hashSync(textPassword, this.saltRounds);
    }

    verify(textPassword, encryptedPassword) {
        return this.bcrypt.compareSync(textPassword, encryptedPassword);
    }
}

export default new PasswordUtils();
