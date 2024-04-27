const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const bodyParser = require('body-parser')


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

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

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedRecord = req.body; // Assuming the updated data is sent in the request body
  
  con.query('UPDATE sectionsdata SET ? WHERE id = ?', [updatedRecord, id], (error, results, fields) => {
    if (error) {
      console.log(error);
      console.error('Error updating data: ' + error.stack);
      res.status(500).json({ error: 'Error updating data' });
      return;
    }
    console.log('Data updated successfully');
    res.status(200).json({ message: 'Data updated successfully' });
  });
});


module.exports = router