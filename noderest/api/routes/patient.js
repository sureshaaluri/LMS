const express = require('express');

const router = express.Router();

//const mongoose = require('mongoose');

//const Contract = require('../model/contracts');
const read_file = require('../controllers/patientcontroller');

// router.get('/',read_file.get_all_data);

router.get('/:ID',read_file.get_data);

router.delete('/:ID',read_file.delete_data);

router.get('/history/:ID',read_file.get_history_data);

router.post('/', read_file.load_data);

router.post('/insurance',read_file.init_insurance);

router.post('/consent',read_file.grant_consent);

router.post('/prescription',read_file.init_prescription);


module.exports = router;

