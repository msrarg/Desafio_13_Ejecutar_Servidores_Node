const mongoose = require('mongoose');

const dbConnectionMongoAtlas = async () => {
    try {
        await mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser:    true, // <-- no longer necessary.
            useUnifiedTopology: true, // <-- no longer necessary.
            // useCreateIndex:     true,
            // useFindAndModify:   false
        });
        console.log('MongoDB Atlas connection established.');
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}.`);
        throw new Error(`MongoDB connection failed: ${error}.`);
    }
}

module.exports = {
    dbConnectionMongoAtlas
};
