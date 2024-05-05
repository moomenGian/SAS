const express = require('express');
const router = express.Router()
const mysql = require('mysql2')


// DB SETUP:
// CREATE TABLE `anecdotaldb`.`sectionsdata` (
//     `sectionName` VARCHAR(50) NOT NULL,
//     `adviser` VARCHAR(45) NULL,
//     `id` INT NOT NULL AUTO_INCREMENT,
//     `violator` VARCHAR(45) NULL,
//     `violation` VARCHAR(45) NULL,
//     `violationDescription` VARCHAR(105) NULL,
//     `witness` VARCHAR(45) NULL,
//     `date` DATETIME NULL,
//     PRIMARY KEY (`id`));
 
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



async function getData(sectionName) {
    const sql = "SELECT * FROM sectionsdata WHERE sectionName = ?"

    return new Promise((resolve, reject) => {
        con.query(sql, [sectionName], (err, res) => {
            if(err){
                console.error('ERROR EXECUTING QUERY', err)
                reject(err)
            }
    
            if(res.length === 0){
                resolve(null)
            }else{
                const result = []
                res.forEach((record) => {
                    const {sectionName, adviser, violator, violation, violationDescription, witness, date, id} = record
                    result.push({
                        [sectionName]: {
                            adviser,
                            violations: [{violator, violation, violationDescription, witness, date, id}]
                        }
                    })
                })
                resolve(result)
    
            }
        })
    })
    
}
 

router.get('/:sectionName', async (req, res) => {
    const { sectionName } = req.params;

    const sectionData = await getData(sectionName)

    if(sectionData){
        res.json(await getData(sectionName))
    }else{
        res.status(404).json({error: 'Section not found or Section does not have records yet'})
    }
})

module.exports = router
