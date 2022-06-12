const express = require('express');
const dbConnection = require('./config/db');
const cors = require('cors');

const app = express();
// Connect DB
dbConnection()
// Enable cors
const whitheList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(whitheList.includes(origin)){
            callback(null, true)
        }else {
            callback(new Error('URL not allowed to send and get request'))
        }
    }
}

app.use(cors());
// Enable send json data
app.use(express.json({extended:true}));

// Routes
app.use('/api/appointments', require('./routes/appointments'));

const port = process.env.PORT || 4000;
app.listen( (port), () => {
    console.log(`Server is running on port ${port}`)
});

//appointments