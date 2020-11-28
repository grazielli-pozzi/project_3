import Process from '../models/Process';

class ProcessesRepository {
    constructor(processModel) {
        this.Process = processModel;
    }

    async get() {
       const processes = await this.Process.find();

       console.log(processes);

       return processes;

    }

    async getOne(id) {
        const process = await this.Process.findById(id);

        console.log(process);
 
        return process;
 
    }

    async create(processBody) {
        const newProcess = new this.Process(processBody);

        console.log(newProcess);

        await newProcess.save();
    }

    async updateOne(id) {

    }

    async deleteOne(id) {

    }

}

export default new ProcessesRepository(Process);

