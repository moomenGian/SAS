const express = require('express')
const router = express.Router()
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

router.delete('/:id', (req, res) => {
  const recordId = req.params.id;

  try {
    con.query('DELETE FROM sectionsdata WHERE id = ?', recordId, (error, results) => {
      if(error){
        console.error('error deleting record'+error)
        res.status(500)
        return
      }
      res.status(200).send('deleted successfully')
      console.log('deleted record');
    });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).send('An error occurred while deleting the record');
  }

})


module.exports = router