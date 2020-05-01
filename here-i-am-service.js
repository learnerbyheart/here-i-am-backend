module.exports = function HereIAmService() {
    let data = { latitude: null, longitude: null, time: null };

    function saveLocation(latitude, longitude, time = new Date()) {
        if (!isNumeric(latitude)) {
            throw new Error('latitude should be a number')
        }
        if (!isNumeric(longitude)) {
            throw new Error('longitude should be a number')
        }
        if (latitude < -85 || latitude > 85) {
            throw new Error('latitude must be within [-85, 85]')
        }

        if (longitude < -180 || longitude > 180) {
            throw new Error('longitude must be within [-180, 180]')
        }
        if (typeof time.getMonth !== 'function') {
            throw new Error('time should be of type date')
        }
        data = { latitude, longitude, time };
        return data;
    }

    function getLocation() {
        return data
    }

    function isNumeric(value) {
        return !isNaN(value - parseFloat(value));
    }

    return {
        saveLocation,
        getLocation
    }
}