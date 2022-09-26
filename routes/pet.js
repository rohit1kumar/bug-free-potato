const express = require('express');
const router = express.Router();
const { addData, getData, getAllData, updateData, deleteData } = require('../controllers/pet');
const { uploadFileToServer, deleteFileFromServer } = require('../utils/files');

router.route('/')
    .post(uploadFileToServer, addData, deleteFileFromServer) // POST /api/pet
    .get(getAllData);   // GET /api/pet

router.route('/:petId')
    .get(getData)    // GET /api/pet/:petId
    .patch(updateData)   // PATCH /api/pet/:petId
    .delete(deleteData);  // DELETE /api/pet/:petId

module.exports = router;
