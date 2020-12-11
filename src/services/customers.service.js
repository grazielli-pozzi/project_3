// import customersRepository from '../repository/customers.repository';
// import ApplicationError from '../errors/ApplicationError';

// class CustomerService {
//     constructor(customerRepository) {
//         this.customersRepository = customerRepository;
//     }

    // async get(id, search) {
    //     try {
    //         const customers = await this.customersRepository.get(id, search);
    //         return customers;
    //     } catch (error) {
    //         throw new ApplicationError({ message: error.message, type: 'Customers - get method', status: 502 });
    //     }
    // }

    // async getOne(id) {
    //     const customer = await this.customersRepository.getOne(id);
    //     return customer;
    // }

    // async create(customerBody, id) {
    //     await this.customersRepository.create(customerBody, id);
    // }

    // async updateOne(customerId, data) {
    //     const customer = await this.customersRepository.updateOne(customerId, data);
    //     return customer;
    // }

    // async deleteOne(id) {
    //     await this.customersRepository.deleteOne(id);
    // }

// }

// export default new CustomerService(customersRepository);
