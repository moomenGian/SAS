const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'anecdotalDB'
});

// CREATE TABLE `anecdotaldb`.`casehistory` (
//   `caseID` INT NULL,
//   `event_date` VARCHAR(45) NULL,
//   `eventDescription` VARCHAR(45) NULL,
//   `initiator` VARCHAR(45) NULL,
//   `notes` VARCHAR(45) NULL);


router.post('/', (req, res) => {
  const { caseID, event_date, eventDescription, initiator, notes } = req.body;

  const sql = `INSERT INTO caseHistory (caseID, event_date, eventDescription, initiator, notes) 
               VALUES (?, ?, ?, ?, ?)`;
  const values = [caseID, event_date, eventDescription, initiator, notes];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving history event:', err);
      res.status(500).json({ message: 'Error saving history event to the database' });
    } else {
      res.status(200).json({ message: 'History event saved successfully' });
    }
  });
});

module.exports = router;
