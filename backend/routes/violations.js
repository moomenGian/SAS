const express = require('express')
const router = express.Router()
// const mysql = require('mysql2')
// const { formatDate } = require('../dateFormat.js')

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'test'
// })



router.get('/', (req, res) => {
    const query = ` SELECT v.ViolationDate, v.ViolationDescription
                    FROM students s
                    JOIN violations v ON s.StudentID = v.StudentID
                    WHERE s.StudentName = 'xander'; `

    // connection.query(query, (err, results) => {
    //     if(err){
    //         console.error('Error executing query ', err)
    //         return res.status(500).json({ error: 'Error fetching violations data' });
    //     }

    //     return res.send(formatDate(results))

    // })

    return res.send({
        test: 'asdasddasdasasd'
    })
})

module.exports = router
