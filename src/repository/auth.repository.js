import User from '../models/User';

class AuthRepository {
    constructor(UserModel) {
        this.User = UserModel;
    }

   async findUser(cpf) {
        const user = this.User.findOne({ cpf });
        return user;
    }

    async saveUser(body) {
        const newUser = new User(body);
        await newUser.save();
    }

}

export default new AuthRepository(User);

