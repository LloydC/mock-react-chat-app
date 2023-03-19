const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
let users = [];
let messages = [];

app.use(cors());

// fires on a new connection
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('addMessage', (data) => { //Listens and logs the message to the console
        messages.push(data);
        socketIO.emit('messageResponse', messages);
    });

    socket.on('addReply', async (data) => {
      // filter through messages
      const updateMessages = await messages.map(message => {
        if(message.id === data.messageId){
          message.repliesID.push(data); // add comment
          console.log('update', message)
          return message
        }
        else {
          return message
        }
      })
      socketIO.emit('messageResponse', updateMessages);  // send messages back
    })

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
    
    socket.on('newUser', (data) => { //Listens when a new user joins the server
      
      users.push(data); //Adds the new user to the list of users
      // console.log(users);
      
      socketIO.emit('newUserResponse', users); //Sends the list of users to the client
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter((user) => user.socketID !== socket.id);

      //Sends the list of users to the client
      socketIO.emit('newUserResponse', users);
      socket.disconnect();
    });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});