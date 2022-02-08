const mongoose = require('mongoose');

const connectDb = async () => {
   try{
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    console.log('Server is connected with MongoDB Atlas',conn.connection.host)
   }catch(err){
       console.log(err);
       process.exit(1);
   }
}

module.exports = {connectDb}