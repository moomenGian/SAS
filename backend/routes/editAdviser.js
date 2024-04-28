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

router.put('/:sectionName', (req, res) => {
    const sectionName = req.params.sectionName;
    const newAdviser = req.body.newAdviser;
    const sql = 'UPDATE sectionsdata SET adviser = ? WHERE sectionName = ?';
    con.query(sql, [newAdviser, sectionName], (err, result) => {
        if (err) {
            console.error('Error updating adviser:', err);
            res.status(500).send('Error updating adviser');
        } else {
            res.status(200).send('Adviser updated successfully');
        }
    });
});

module.exports = router;
