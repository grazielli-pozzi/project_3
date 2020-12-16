import Process from '../models/Process';

class ProcessesRepository {
    constructor(processModel) {
        this.Process = processModel;
    }

    async get(id, id2, search) {
        const regex = new RegExp(search, 'i');
        const processes = await this.Process.find({ description: regex, customer: id, lawyer: id2 });

       console.log(processes);

       return processes;

    }

    async getOne(id) {
        const process = await this.Process.findById(id);

        console.log(process);
 
        return process;
 
    }

    async create(processBody, id, id2) {
        const newProcess = new this.Process({ ...processBody, customer: id, lawyer: id2 });

        await newProcess.save();

        console.log('Objeto salvo');
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

export default new ProcessesRepository(Process);
