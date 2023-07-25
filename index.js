const express =require('express')
require('dotenv').config()
const breadController = require('./controllers/bread')
const mongoose=require('mongoose')

const bakerController = require('./controllers/baker')
const methodOverride = require('method-override')

const app =express()
// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


//routes
app.use('/breads',breadController)
app.use('/bakers',bakerController)
const PORT =process.env.PORT

app.listen(PORT, console.log(`listening on port ${PORT}`))