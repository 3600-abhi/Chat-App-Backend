const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { ServerConfig, DatabaseConfig } = require('./config');
const path = require('path');
const apiRoutes = require('./routes');


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


io.on('connection', function (socket) {

    console.log('A user connected', socket.id);

    socket.on('disconnect', function () {
        console.log('A user disconnected', socket.id);
    });

    socket.on('join_room', function (data) {
        console.log('joined room', data.roomId);
        socket.join(data.roomId)
    });

    socket.on('new_msg', function (data) {
        io.to(data.roomId).emit('msg_rcvd', data);
    });
});

app.use('/api', apiRoutes);


app.get('/chat/:roomId/:user', async function (req, res) {
    res.render('index', { roomId: req.params.roomId, user: req.params.user });
});

app.get('/group', async function (req, res) {
    res.render('group');
});


server.listen(ServerConfig.PORT, async function () {
    console.log(`Successfully started the server at PORT : ${ServerConfig.PORT}`);
    await DatabaseConfig.connect();
});