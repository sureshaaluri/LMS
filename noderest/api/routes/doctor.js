const express = require('express');

const router = express.Router();

//const mongoose = require('mongoose');

//const Contract = require('../model/contracts');
const read_file = require('../controllers/doctorcontroller');

// router.get('/',read_file.get_all_data);

router.get('/:ID',read_file.get_data);

router.get('/',read_file.get_all_data);

router.delete('/:ID',read_file.delete_data);

router.get('/history/:ID',read_file.get_history_data);

router.post('/', read_file.load_data);

router.post('/assignPatient',read_file.assign_patient);




module.exports = router;

