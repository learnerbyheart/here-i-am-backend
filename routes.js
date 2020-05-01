const routes = require('express').Router();
const hereIAmService = require('./here-i-am-service')();

routes.get('/location', (req, res) => {
    const lastLocation = hereIAmService.getLocation()
    if (lastLocation.latitude === null || lastLocation.longitude === null || lastLocation.time === null) {
        return res.status(404).send()
    }
    return res.status(200).json(lastLocation);
});

routes.post('/location', (req, res) => {
    const { latitude, longitude, time } = req.body
    if (!Number.isInteger(time)) {
        return res.status(400).send("time should be an integer number")
    }
    const dateTime = new Date(time)
    try {
        const location = hereIAmService.saveLocation(latitude, longitude, dateTime)
        res.status(200).json(location)
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = routes;