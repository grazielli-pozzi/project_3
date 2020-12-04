import ApplicationError from '../errors/ApplicationError';
import AuthRepository from '../repository/auth.repository';
import PasswordUtils from '../utils/password.utils';

class AuthService {
    constructor(authRepo) {
        this.authRepository = authRepo;
    }

   async register(body) {
       try {
            await this.verifyExistentUser(body);

         const newUser = { ...body, password: PasswordUtils.encrypt(body.password) };

         console.log(newUser);

         await this.authRepository.saveUser(newUser);
        
     } catch (error) {
           throw new ApplicationError(error);
       }

    }

    async verifyExistentUser({ cpf }) {
        const user = await this.authRepository.findUser(cpf);
        

        if(user) {
            throw new ApplicationError({ message: 'Usuário já cadastrado', type: 'Auth-sigup', status: 400 });
        }

    }


}

export default new AuthService(AuthRepository);
