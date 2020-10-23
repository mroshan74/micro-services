import mongoose from 'mongoose'
import { DatabaseConnectionError } from '../app/errors/database-connection-error'

const configureDB = async() => {
    let url = 'mongodb://localhost:27017/ms-auth-srv-db'
    if (process.env.NODE_ENV === 'production'){
        url = process.env.CLOUD_DB!
    }
    try{
        mongoose.connect(url,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false  
        })
        console.log('connected to ms-auth-srv-db...')
    }
    catch(err){
        throw new DatabaseConnectionError()
    }
}

export default configureDB