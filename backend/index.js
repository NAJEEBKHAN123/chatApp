const express = require('express');
const DBconnection = require('./utils/db')
const authRoutes = require('./router/authRouter')
const messageRoutes = require('./router/messageRoutes')

const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const { app, server } = require('./utils/socket');
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
app.use('/api/messages', messageRoutes)




server.listen(PORT, () =>{
    console.log(`Server is runnig on http://localhost:${PORT}`)
})