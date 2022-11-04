var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const Server = require("socket.io").Server;
const _ = require('underscore')

const socketManager = require('./src/socketManager');

const http = require('http');

var indexRouter = require('./src/routes/index');
// var usersRouter = require('./src/routes/users');

const port = process.env.PORT || 3008;

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

const httpServer = http.createServer(app);
const io = new Server(httpServer,
    {
        cors: '*'
    });


// io.on("connection", socket => socketManager(socket, io ));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('userdata', (data) => {
        console.log(data);
        socket.join("chatRoom")
    });

    socket.on('chatMessage', (data) => {
        console.log(`CM -> ${JSON.stringify(data)}`)
        if(!!data){
        //let message={...data, id: _.uniqueId('msg_'), timestamp: Date.now(), editedTimestamp: null}
        // socket.emit('newMessage', message);
        let message=Object.assign({}, data, {id: _.uniqueId('msg_'), timestamp: Date.now(), editedTimestamp: null});
        io.emit('newMessage', message);
        }
    });

    socket.on('updateMessage', (data) => {
        console.log(`EM -> ${JSON.stringify(data)}`)
        //let message = {...data, editedTimestamp: Date.now()}
        // socket.emit('newMessage', message);
        let message=Object.assign({},data,{editedTimestamp: Date.now()})
        io.emit('editedMessage', message);
    });

    socket.on('removeMessage', (data) => {
        console.log(`EM -> ${JSON.stringify(data)}`)
        //let message = {...data, timestamp: Date.now()}
        let message=Object.assign({},data,{timestamp: Date.now()})
        // socket.emit('newMessage', message);
        io.emit('deletedMessage', message);
    });
});

app.set("io", io);

httpServer.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`)
});

module.exports = app;
