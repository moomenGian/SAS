const express = require('express');
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
        console.err('ERROR CONNECTING TO DATABASE', err);
        return
    }
    console.log('Connected to DB');
})


async function getDatas() {
    const sql = "SELECT * FROM sectionsdata"

    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if(err){
                console.error('ERROR EXECUTING QUERY', err)
                reject(err)
            }
    
            if(res.length === 0){
                resolve(null)
            }else{
                const result = []
                res.forEach((record) => {
                    const {sectionName, adviser, violator, violation, witness, date} = record
                    result.push({
                        [sectionName]: {
                            adviser,
                            violations: [{violator, violation, witness, date}]
                        }
                    })
                })
                
                resolve(result)
    
            }
        })
    })
    
}





router.get('/', async (req, res) => {

    const data = await getDatas()

    if(data){
        res.json(data)
    }else{
        res.status(404).json({error: 'Error getting all record'})
    }
})

module.exports = router