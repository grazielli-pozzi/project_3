import Process from '../models/Process';

class ProcessesRepository {
    constructor(processModel) {
        this.Process = processModel;
    }

    async get() {
       const processes = await this.Process.find();

       return processes;
    }

    async getOne(id) {

    }

    async add() {

    }

    async updateOne(id) {

    }

    async deleteOne(id) {

    }

}

export default new ProcessesRepository(Process);

