import mongoose from 'mongoose';

class MongoConnection {
    constructor(dbURL) {
        this.mongoose = mongoose;
        this.URL = dbURL;
    }

    startConnection() {
        this.mongoose.connect(
            this.URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        )
        .then(() => console.log('Database connected'))
        .catch(error => console.log(error));
    }
}

export default MongoConnection;