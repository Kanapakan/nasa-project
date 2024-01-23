const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-api:196zwg9hphg99mhl@cluster0.1w4ik.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
	console.log('Mongo connection is ready!');
});

mongoose.connection.on('error', (err) => {
	console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}