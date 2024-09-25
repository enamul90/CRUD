

const express = require('express');
const bodyParser = require("body-parser")
const {MongoClient}= require('mongodb');

const router = require('./router/api');

const app = express();
const port =3010;

const url = 'mongodb://localhost:27017'
const dbName = 'StudentsDB'

let db = null;


//  connect to MongoDB
const connectToMongoDB =async() => {
    const client = new MongoClient(url)
    await client.connect()
    db = client.db(dbName)
    console.log('Connected to MongoDB')
    return db
}


app.use(bodyParser.json())
connectToMongoDB().then((databases) => {
    app.use((req,res,next)=>{
        req.db = databases
        next()  
    })

    // routes
    app.use("/api",router)

}).catch((err) => {
    console.log('Error connecting to MongoDB:', err)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





