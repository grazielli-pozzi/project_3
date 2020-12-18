import Process from '../models/Process';
import User from '../models/User';
import ApplicationError from '../errors/ApplicationError';

class ProcessesRepository {
    constructor(processModel, userModel) {
        this.Process = processModel;
        this.User = userModel;
    }

    async get(id, search) {
        const regex = new RegExp(search, 'i');
        const processes = await this.Process.find({ description: regex, lawyer: id });

       console.log(processes);

       return processes;

    }

    async getByCustomerID(id, search) {
        const regex = new RegExp(search, 'i');
        const processes = await this.Process.find({ description: regex, customer: id });

       console.log(processes);

       return processes;

    }

    async getOne(id) {
        const process = await this.Process.findById(id);

        console.log(process);
 
        return process;
 
    }

    async create(processBody, id) {
        const registeredClient = await this.User.findOne({ cpf: processBody.customer, role: 'cliente' });

        if(registeredClient) {
            const newProcess = new this.Process({ ...processBody, lawyer: id });
    
            await newProcess.save();

        }
        throw new ApplicationError({ message: 'Cliente não cadastrado', type: 'Client-Not-Registered', status: 401 });
        }


    async updateOne(processId, data) {
        const updatedProcess = this.Process.findByIdAndUpdate(
            processId,
            data,
            { new: true, useFindAndModify: false },
            );

        return updatedProcess;
    }

    async deleteOne(id) {
        await this.Process.findByIdAndDelete(id);
    }

}

export default new ProcessesRepository(Process, User.User);
