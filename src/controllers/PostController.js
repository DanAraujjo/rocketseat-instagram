const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt'); // retorno em ordem descrecente

    return res.json(posts);
  },

  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;

    const { filename: image } = req.file;

    // renomear extensao do arquivo
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    // redimensionar a image
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );

    // excluir a original
    fs.unlinkSync(req.file.path);

    // salva no banco de dados
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    // emite um sinal via websocket
    req.io.emit('post', post);

    return res.json(post);
  },
};
