const mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});

const dbConnection = async () => {

    try {
        const connection = await mongoose.connect(process.env.BACKEND_DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${connection.connection.host} ${connection.connection.port}`;
        console.log('DB connected correctly on:', url)
    } catch (error) {
        console.log(error, 'Unable to connect to DB')
        process.exit(1) // Close the connection
    }
}

module.exports = dbConnection;