const express = require('express');
const DBconnection = require('./utils/db')
const app = express();
const authRoutes = require('./router/authRouter')
const messageRoutes = require('./router/messageRoutes')

const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()


//db connection
DBconnection()

//middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}
    
));
app.use(cookieParser());

const PORT = process.env.PORT || 3000


app.get('/', (req, res) =>{
    res.send("this is home page")
})

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)




app.listen(PORT, () =>{
    console.log(`Server is lestening on http://localhost:${PORT}`)
})