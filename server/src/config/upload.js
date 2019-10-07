const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    // local de destino
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    // nome original do arquivo
    // filename:  function(req, file, cb) {
    //     cb(null, file.originalname);
    // }
  }),
};
