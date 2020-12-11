import Customer from '../models/User';

class CustomerRepository {
    constructor(customerModel) {
        this.Customer = customerModel;
    }

    // async get(id, search) {
    //     const regex = new RegExp(search, 'i');
    //     const customers = await this.Process.find({ description: regex, customer: id });

    //    console.log(customers);

    //    return customers;

    // }

    // async getOne(id) {
    //     const customer = await this.Customer.findById(id);

    //     console.log(customer);
 
    //     return customer;
 
    // }

    async create(customerBody, id) {
        const newCustomer = new this.Process({ ...customerBody, customer: id });

        await newCustomer.save();

        console.log('Objeto salvo');
    }

    // async updateOne(customerId, data) {
    //     const updatedCustomer = this.Customer.findByIdAndUpdate(
    //         customerId,
    //         data,
    //         { new: true, useFindAndModify: false },
    //         );

    //     return updatedCustomer;
    // }

    // async deleteOne(id) {
    //     await this.Customer.findByIdAndDelete(id);
    // }

}

export default new CustomerRepository(Customer);
