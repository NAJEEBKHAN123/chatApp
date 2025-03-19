const express = require('express');
const DBconnection = require('./utils/db')
const app = express();
const authRoute = require('./router/authRouter')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()


//db connection
DBconnection()

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000


app.get('/', (req, res) =>{
    res.send("this is home page")
})

app.use('/api/auth', authRoute)



app.listen(PORT, () =>{
    console.log(`Server is lestening on http://localhost:${PORT}`)
})