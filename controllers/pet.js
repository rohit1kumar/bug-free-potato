const { Pet } = require('../models/pet');
const XLSX = require("xlsx");
const { ErrorHandler } = require('../utils/error');
const { asyncWrapper } = require('../middleware/asyncErrorHander');

const addData = asyncWrapper(async (req, res, next) => {

    if (!req.file) throw new ErrorHandler("Please upload a file", 400);

    const workbook = XLSX.readFile(req.file.path);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    await Pet.create(xlData);

    res.status(200).json({
        status: 'success',
        message: 'Data added successfully',
    });

    next(); // call next middleware to delete file from server
});

const getAllData = asyncWrapper(async (req, res) => {

    const { limit, page, sort, name, type, age, breed } = req.query;

    /*QUERY BUILDER*/
    const queryObj = {};
    if (name) queryObj.name = { $regex: name, $options: 'i' }; // i for case insensitive
    if (type) queryObj.type = type;
    if (age) queryObj.age = age;
    if (breed) queryObj.breed = breed;

    const query = Pet.find(queryObj);

    /*SORTING*/
    if (sort) {
        const sortBy = sort.split(',').join(' ');
        query.sort(sortBy);
    } else {
        query.sort('createdAt');
    }

    /*PAGINATION*/
    let parseLimit = parseInt(limit);
    let parsePage = parseInt(page);

    if (!parseLimit || parseLimit < 1) parseLimit = 10; // default limit
    if (!parsePage || parsePage < 1) parsePage = 1;

    const skip = (parsePage - 1) * parseLimit; // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100

    query.skip(skip).limit(parseLimit).select('-__v');

    console.time('query time for getAllData');
    const data = await query.lean();
    console.timeEnd('query time for getAllData');

    if (data.length === 0) throw new ErrorHandler('No data found', 404);

    res.status(200).json({
        status: 'success',
        nbHits: data.length,
        data
    });
});

const getData = asyncWrapper(async (req, res) => {

    const { petId } = req.params;

    console.time('query time for getData');
    const data = await Pet.findById(petId).select('-__v').lean();
    console.timeEnd('query time for getData');

    if (!data) throw new ErrorHandler(`No data found with petId ${petId}`, 404);

    res.status(200).json({ status: 'success', data });
});

const updateData = asyncWrapper(async (req, res) => {

    const { petId } = req.params;
    const { name, type, breed, age } = req.body;

    if (!name && !type && !breed && !age) throw new ErrorHandler('Please provide fields to update', 400);

    const data = await Pet.findByIdAndUpdate(petId, { name, type, breed, age }, { new: true, runValidators: true }).select('-__v').lean();

    if (!data) throw new ErrorHandler(`No data found with petId ${petId}`, 404);

    res.status(200).json({ status: 'success', data });
});

const deleteData = asyncWrapper(async (req, res) => {

    const { petId } = req.params;

    const data = await Pet.findByIdAndDelete(petId).select('-__v').lean();

    if (!data) throw new ErrorHandler(`No data found with petId ${petId}`, 404);

    res.status(200).json({ status: 'success', message: 'Data deleted successfully', data });
});


module.exports = { addData, getAllData, getData, updateData, deleteData };