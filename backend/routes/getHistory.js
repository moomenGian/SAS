const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'anecdotalDB'
});
 


router.get('/', (req, res) => {
  const caseID = req.query.caseID;
  if (!caseID) {
    return res.status(400).json({ error: 'caseID parameter is required' });
  }

  const sql = 'SELECT * FROM caseHistory WHERE caseID = ?';
  con.query(sql, [caseID], (error, results) => {
    if (error) {
      console.error('Error fetching caseHistories:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

module.exports = router;
