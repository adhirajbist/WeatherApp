const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup hbs engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Adhiraj Bist'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Adhiraj Bist'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'this is some helpful text.',
        title: 'Help',
        name: 'Adhiraj Bist'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address not provided'            
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        
        if(error){
           return res.send({
               error
           })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                location,
                forecastData
            })
        })
    })    
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Adhiraj Bist',
        errorMessage: 'Error 404: Help page not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Adhiraj Bist',
        errorMessage: 'Error 404: Page not Found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})