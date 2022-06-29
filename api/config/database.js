const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb://localhost:27017/test?retryWrites=false', {
			useNewUrlParser: true,
			useUnifiedTopology: true,			
		});

		console.log(`Database Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
