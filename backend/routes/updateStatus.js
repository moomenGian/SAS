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

con.connect((err) => {
  if(err){
    console.error('error connecting to DB', err);
    return;
  }
});

router.post('/', (req, res) => {
  const { recordID, newStatus } = req.body;
  

  // Check if the required fields are present
  if (!recordID || !newStatus) {
    return res.status(400).json({ message: 'Record ID and new status are required' });
  }

  // Update the status of the record in the database
  const sql = `UPDATE sectionsdata SET status = ? WHERE id = ?`;
  con.query(sql, [newStatus, recordID], (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ message: 'An error occurred while updating status' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

module.exports = router;
