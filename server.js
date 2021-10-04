const express=require('express');
const app=express();
const server=require('http').createServer(app);
const { Server }=require('socket.io');
const io=new Server(server);

server.listen(process.env.PORT || 5000, ()=>{
    console.log('listening');
});

app.set('view engine', 'ejs');
app.set('views', 'views/');
app.use(express.static('views/public'));

io.on('connection', (socket)=>{
    socket.join(socket.handshake.auth.yours);
    socket.on('msg', (data)=>{
        socket.to(socket.handshake.auth.opp).emit('msg', data);
    });
    socket.on('again', (data)=>{
        socket.to(socket.handshake.auth.opp).emit('again', data);
    });
    socket.on('accept', (data)=>{
        socket.to(socket.handshake.auth.opp).emit('accept', data);
    });
    socket.on('decline',(data)=>{
        socket.to(socket.handshake.auth.opp).emit('decline', data);
    })
});

app.get('/', (req, res)=>{
    res.render('login');
});

app.get('/play', (req, res)=>{
    res.render('index');
});