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

router.post('/', (req, res) => {
    const {
        sectionName,
        adviser,
        violator,
        violation,
        violationDescription,
        witness,
        date,
        } = req.body;

    const sql = `INSERT INTO sectionsdata(sectionName, adviser, violator, violation, violationDescription, witness, date)
                 VALUES(?,?,?,?,?,?,?)`

    const data = [sectionName, adviser, violator, violation, violationDescription, witness, date]

    con.query(sql, data, (err, results) => {
        if(err){
            console.error('Error inserting record', err);
            res.status(500).send('error inserting record')
            return
        }
        res.status(200).send('Succesfully inserted record')
    })
})


module.exports = router