import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './routes/route.js';
import bodyParser from 'body-parser'

const app = express();

//middleware modules

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.disable('x-powered-by');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const port = 8080;

//Hypertext Transfer Protocol GET request
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

//routes for API
app.use('/api', router)

connect().then(()=> {
    try{
        app.listen(port, () => {
            console.log('Server connected to http://localhost:' + port)
        });
    } catch(error){
        console.log("Can't connect")
    }
}).catch(error => {
    console.log('INVALID')
})

