const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app); // servidor http
const io = require('socket.io')(server); // servidor websocket

// conection do banco de dados //senha do site  mongoDb Atlas: kbce63yx!
mongoose.connect('mongodb+srv://backend:kbce63yx@cluster0-fcgvh.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// repassa informação do IO para todas as rotas
app.use((req, res, next) => {
  req.io = io;
  next();
});

// cors
app.use(cors());

// rota para acessar os arquivos estaticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// arquivo com as configurações das rotas
app.use(require('./routes'));

// porta do serviço
server.listen(3333);
