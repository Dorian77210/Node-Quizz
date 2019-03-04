const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// App configuration
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
//configuration of the headers


// Routes
const userRoutes = require('./api/routes/users');
const quizzRoutes = require('./api/routes/quizz');
const questionsRoutes = require('./api/routes/questions');
const homeController = require('./api/routes/home');

// Connect to database
mongoose.connect(
    "mongodb://Dudka:" + process.env.MONGO_ATLAS_PW + "@cluster0-shard-00-00-1tk7y.mongodb.net:27017,cluster0-shard-00-01-1tk7y.mongodb.net:27017,cluster0-shard-00-02-1tk7y.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    {
        useNewUrlParser: true
    }
);

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers",
//                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if(req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods",
//                    "PUT, POST, PATCH, DELETE, GET"
//         );
//         return res.status(200).json({});
//     }
// })

// Use routes which begin by /users
app.use('/users', userRoutes);

// Use routes which begin by /quizz
app.use('/quizz', quizzRoutes);

// Use routes which begin by /question
app.use('/questions', questionsRoutes);

app.use('/', homeController);

app.use(express.static('public'));

// Errors handling requests
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;