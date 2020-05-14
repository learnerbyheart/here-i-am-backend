const routes = require('express').Router();
const hereIAmService = require('./here-i-am-service')();

routes.get('/location', (req, res) => {
    const { latitude, longitude, date } = hereIAmService.getLocation()
    if (latitude === null || longitude === null || date === null) {
        return res.status(404).send()
    }
    return res.status(200).json({ latitude, longitude, time: date.getTime() });
});

routes.post('/location', (req, res) => {
    if (!req.header("Content-Type").includes("application/json")) {
        return res.status(415).send("only application/json is accepted")
    }
    const { latitude, longitude, time } = req.body
    if (!Number.isInteger(time)) {
        return res.status(400).send("time should be an integer number")
    }
    const dateTime = new Date(time)
    try {
        const location = hereIAmService.saveLocation(latitude, longitude, dateTime)
        res.status(200).json({ latitude: location.latitude, longitude: location.longitude, time: location.date.getTime() })
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = routes;