const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'anecdotalDB'
});

con.connect((err) => {
  if(err){
      console.error('Error connecting to DB', err);
      return;
  }
});

router.get('/:strand', (req, res) => {
  const strand = req.params.strand

  const sql = 'SELECT * FROM sectionslist WHERE strand = ?'

  con.query(sql, [strand], (err, results) => {
    if(err){
      res.status(404).send('error getting section names', err)
      return
    }

    if(results.length === 0){
      // res.status(404).send('no section names found')
    }
    res.json(results)
  })
})

module.exports = router