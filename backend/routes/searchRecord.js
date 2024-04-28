const express = require('express');
const router = express.Router();
const mysql = require('mysql2')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'anecdotalDB'
})

con.connect((err) => {
  if(err){
      console.error('error connecting to DB', err);
      return
  }
})

// Search records
router.get('/', async (req, res) => {
  const { query } = req.query;

  if (!query || query.length < 3) {
    return res.status(400).json({ error: 'Invalid query' });
  }

  try {
    const queryStr = `
      SELECT * FROM sectionsdata 
      WHERE violationDescription LIKE '%${query}%'
      OR violator LIKE '%${query}%'
      OR violation LIKE '%${query}%'
      OR witness LIKE '%${query}%'
      OR date LIKE '%${query}%'
    `;
    con.query(queryStr, (err, results) => {
      if (err) {
        console.error('Error searching records:', err);
        res.status(500).send('An error occurred while searching records');
        return;
      }
      console.log(results);
      res.json(results);
    });
  } catch (error) {
    console.error('Error searching records:', error);
    res.status(500).send('An error occurred while searching records');
  }
});

module.exports = router;
