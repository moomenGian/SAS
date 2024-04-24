const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())

const users = [
    {username: 'admin', password: 'admin1'}
]

router.post('/', (req, res) => {
    const {username, password} = req.body

    const user = users.find((user) => user.username === username && user.password === password)

    if(user){
        res.status(200).json({username, password})
    }else{
        res.status(401).json({ error: 'Invalid User'})
    }
})

module.exports = router