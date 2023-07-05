const express = require( "express" );
const bodyParser = require('body-parser')
const homeRoutes = require('./routes/homeRoutes')
const dashRoutes = require('./routes/dashRoutes')
const revenueRoutes = require('./routes/revenueRoutes')


const PORT = 3001;

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', homeRoutes)
app.use('/dashboard',dashRoutes)
app.use('/revenue', revenueRoutes)

app.listen(PORT, (err) => {
    console.log(`Server is starting on port ${PORT}`)
})
  

