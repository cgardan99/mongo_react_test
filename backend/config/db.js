import mongoose from 'mongoose'
import dotenv  from 'dotenv'

//dotenv config
dotenv.config()

const connectDB = async () => {
    try {
        //database Name
        const databaseName='gym';
        const con = await mongoose.connect(`${process.env.DB_URL}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB