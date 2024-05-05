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
 
 
router.post('/', (req, res) => {
  const { sectionName, strand } = req.body;
  const sql = `INSERT INTO sectionslist (sectionName, strand) 
               VALUES (?, ?)`;
  const values = [sectionName, strand];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating new section:', err);
      res.status(500).json({ message: 'Error creating new section:' });
    } else {
      res.status(200).json({ message: 'New section created successfully' });
    }
  });
});

module.exports = router;