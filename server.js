const express = require('express')
const app = express()
const socket = require('socket.io')

app.use(express.static('public'))

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

// Set up Socket
const io = socket(server);

// Listen for Connection
io.on('connection', (socket) => {
    console.log(`Socket Connection Made`, socket.id);

    socket.on('chat',(data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
}) 