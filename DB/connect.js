// Connect to DB first - use refractor

const mongoose = require('mongoose')

//mongodb+srv://Srishti:<password>@atlascluster.6aosdyz.mongodb.net/?retryWrites=true&w=majority

const connectDB = (url) => {
    return mongoose.connect(url)
}

// mongoose.connect(connectionString)
// .then(() => console.log('Connected to DB'))
// .catch((err) => console.log(err))

module.exports = connectDB