const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const sectionsDataRoute = require('./routes/sectionsData')
const insertRecordRoute = require('./routes/insertRecord')
const logInRoute = require('./routes/logIn.js')
const getAllDataRoute = require('./routes/getAllData')
const editRecordRoute = require('./routes/editRecord')
const deleteRecordRoute = require('./routes/deleteRecord')
const searchRecordRoute = require('./routes/searchRecord')
const getRecordRoute = require('./routes/getRecord')
const updateStatusRoute = require('./routes/updateStatus')
const createHistoryRoute = require('./routes/createHistory')
const getHistoryRoute = require('./routes/getHistory')
const editAdviserRoute = require('./routes/editAdviser')
const getSectionsRoute = require('./routes/getSections')
const addSectionRoute = require('./routes/addSection')
const editSectionNameRoute = require('./routes/editSectionName')

const { formatDate } = require('./dateFormat.js')

const app = express()

const port = 3000
app.use(cors())


let studentDatas = []

//send the students name adn section data
app.get('/students', (req,res) => res.send(studentDatas) )

app.get('/', (req,res) => res.send('connected to server'))


app.use('/api/sections', sectionsDataRoute)

app.use('/insertRecord', insertRecordRoute)

app.use('/login', logInRoute)

app.use('/getAllData', getAllDataRoute)

app.use('/edit', editRecordRoute)

app.use('/delete', deleteRecordRoute)

app.use('/search', searchRecordRoute)

app.use('/getRecord', getRecordRoute)

app.use('/updateStatus', updateStatusRoute)

app.use('/createHistory', createHistoryRoute)

app.use('/getHistories', getHistoryRoute)

app.use('/editAdviser', editAdviserRoute)

app.use('/getSectionNames', getSectionsRoute)

app.use('/addSection', addSectionRoute)

app.use('/editSectionName', editSectionNameRoute)

app.listen(port, () => console.log(`connected to port ${port}`))