import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './routes/route.js';
import bodyParser from 'body-parser'

const app = express();

//middleware modules
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

//Hypertext Transfer Protocol GET request
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

//routes for APİ
app.use('/api', router)
app.use(bodyParser.json({limit: '350mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '350mb',
    parameterLimit: 50000,
  }),
);


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

