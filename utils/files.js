const multer = require('multer');
const fs = require('fs/promises');
const { ErrorHandler } = require('./error');

const uploadFileToServer = multer({
    dest: './uploads',
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            return cb(new ErrorHandler('Please upload a excelsheet', 400), false);
        }

        return cb(null, true);
    }

}).single('file');

const deleteFileFromServer = async (req, res) => {
    await fs.unlink(req.file.path);
};

module.exports = { uploadFileToServer, deleteFileFromServer };