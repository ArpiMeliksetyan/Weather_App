const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

/** Define paths for Express config */

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/** Setup handlebars engine and views location */

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


/** Setup static directory to serve*/
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arpi Meliksetyan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arpi Meliksetyan'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is some helpful text',
        title: 'Help',
        name: 'Arpi Meliksetyan'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arpi Melikseyan',
        errorMessage: 'Help article not found'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You should provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arpi Melikseyan',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is running')
})