const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const app = express()
const RoutesUser = require('./routers/route')

app.use(bp.urlencoded({extended: true}))
app.use(bp.json())
app.use(cors())

app.use('/api/users/data', RoutesUser)
app.use('/api/users/data/:id', RoutesUser)
app.use('/api/users/add/data', RoutesUser)
app.use('/api/update/users', RoutesUser)

app.listen(5000, (err) => {
    if(err) throw err;
    console.log('Server running in localhost:5000')
})


