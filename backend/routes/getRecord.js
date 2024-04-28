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

router.get('/:id', (req, res) => {
    const recordId = req.params.id;

    const sql = `SELECT * FROM sectionsdata WHERE id = ?`;
    
    con.query(sql, [recordId], (err, results) => {
        if(err){
            console.error('Error fetching record by ID', err);
            res.status(500).send('Error fetching record by ID');
            return;
        }
        if(results.length === 0){
            res.status(404).send('Record not found');
        } else {
            res.json(results[0]);
        }
    });
});

module.exports = router;
