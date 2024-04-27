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

  try {
    const [results] = await con.promise().execute(
      `SELECT * FROM sectionsdata 
      WHERE violationDescription LIKE ? 
      OR violator LIKE ?
      OR violation LIKE ?
      OR witness LIKE ?
      OR date LIKE ?`,
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
    );
    res.json(results);
  } catch (error) {
    console.error('Error searching records:', error);
    res.status(500).send('An error occurred while searching records');
  }
});

module.exports = router;
