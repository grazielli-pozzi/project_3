import processesRepository from '../repository/processes.repository';

class ProcessesService {
    constructor(processRepository) {
        this.processesRepository = processRepository;
    }

    async get() {
        const processes = await this.processesRepository.get();
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

export default new ProcessesService(processesRepository);
