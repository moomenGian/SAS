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

router.put('/', (req, res) => {
  const sectionName = req.body.name
  const updatedName = req.body.newName
  con.query('UPDATE sectionslist SET sectionName = ? WHERE sectionName = ?', [updatedName, sectionName], (error, results, fields) => {
    if (error) {
      console.log(error);
      console.error('Error updating data: ' + error.stack);
      res.status(500).json({ error: 'Error updating data' });
      return;
    }
    res.status(200).json({ message: 'Data updated successfully' });
  });
});


module.exports = router