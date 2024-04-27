const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const violationsRoute = require('./routes/violations')
const sectionsDataRoute = require('./routes/sectionsData')
const insertRecordRoute = require('./routes/insertRecord')
const logInRoute = require('./routes/logIn.js')
const getAllDataRoute = require('./routes/getAllData')
const editRecordRoute = require('./routes/editRecord')
const deleteRecordRoute = require('./routes/deleteRecord')
const searchRecordRoute = require('./routes/searchRecord')

const { formatDate } = require('./dateFormat.js')

const app = express()

const port = 3000
app.use(cors())


let studentDatas = []

//send the students name adn section data
app.get('/students', (req,res) => res.send(studentDatas) )

app.get('/', (req,res) => res.send('connected to server'))

app.use('/violations', violationsRoute)

app.use('/api/sections', sectionsDataRoute)

app.use('/insertRecord', insertRecordRoute)

app.use('/login', logInRoute)

app.use('/getAllData', getAllDataRoute)

app.use('/edit', editRecordRoute)

app.use('/delete', deleteRecordRoute)

app.use('/search', searchRecordRoute)

app.listen(port, () => console.log(`connected to port ${port}`))