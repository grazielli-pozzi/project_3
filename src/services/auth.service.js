import ApplicationError from '../errors/ApplicationError';
import AuthRepository from '../repository/auth.repository';
import PasswordUtils from '../utils/password.utils';

class AuthService {
    constructor(authRepo) {
        this.authRepository = authRepo;
    }

   async register(body) {
       try {
         this.verifyExistentUser(body);

         body.password = PasswordUtils.encrypt(body.password);

         await this.authRepository.saveUser(body);

        
     } catch (error) {
           throw new ApplicationError(error);
       }

    }

    encryptPassword() {

    }

    async verifyExistentUser({ cpf }) {
        const user = await this.authRepository.findUser(cpf);
        

        if(user) {
            throw new ApplicationError({ message: 'Usuário já cadastrado', type: 'Auth-sigup', status: 400 });
        }

        console.log('Usuário não encontrado');
    }


}

export default new AuthService(AuthRepository);
