import ApplicationError from '../errors/ApplicationError';
import AuthRepository from '../repository/auth.repository';
import PasswordUtils from '../utils/password.utils';

import jwt from 'jsonwebtoken';

class AuthService {
    constructor(authRepo) {
        this.authRepository = authRepo;
    }

   async register(body, id, id2) {
       try {
            await this.verifyExistentUser(body);

         const newUser = { ...body, password: PasswordUtils.encrypt(body.password), 
            customer: id, lawyer: id2 };

         await this.authRepository.saveUser(newUser);
        
     } catch (error) {
           throw new ApplicationError(error);
       }

    }

    async login(userInformation) {
        const userFromDb = await this.authRepository.findUser(userInformation.cpf);
        console.log(userFromDb);

        if(!userFromDb) {
            throw new ApplicationError({ message: 'Usuário não encontrado', type: 'Auth-login-user-not-found', status: 400 });
        }

        const isPasswordCorrect = PasswordUtils.verify(userInformation.password, userFromDb.password);

        if(!isPasswordCorrect) {
            throw new ApplicationError({ message: 'Informações de login incorretas', type: 'Auth-signup', status: 400 });
        }

        const token = jwt.sign(
            { id: userFromDb._id, role: userFromDb.role },
            process.env.TOKEN,
            { expiresIn: '180s' },
            );

            return { token: token, role: userFromDb.role };

    }

    async verifyExistentUser({ cpf }) {
        const user = await this.authRepository.findUser(cpf);
    
        if(user) {
            throw new ApplicationError({ message: 'Usuário já cadastrado', type: 'Auth-signup', status: 400 });
        }

    }

}

export default new AuthService(AuthRepository);
