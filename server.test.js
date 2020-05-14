import app from './server'
const request = require('supertest');

describe('API Tests', () => {

    describe('GET /location', () => {
        it('responds with 404 when no location has been saved', function (done) {
            request(app)
                .get('/location')
                .expect(404, done);
        });

        it('responds with 200 after a location has been saved', async function (done) {
            const data = { latitude: 23.1, longitude: -21.1, time: (new Date()).getTime() }
            try {
                await request(app)
                    .post('/location')
                    .send(data)
                    .set("Content-Type", "application/json")
                    .expect(200, data)
            } catch (error) {
                done(error)
            }
            request(app)
                .get('/location')
                .expect(200, data, done);
        });

        it('responds with 415 when no media type is given after a location has been saved', async function (done) {
            const data = { latitude: 23.1, longitude: -21.1, time: (new Date()).getTime() }
            try {
                await request(app)
                    .post('/location')
                    .send(data)
                    .set("Content-Type", "application/json")
                    .expect(200, data)
            } catch (error) {
                done(error)
            }
            request(app)
                .get('/location')
                .expect(200, data, done);
        });
    });

    describe('POST /location', () => {
        it('responds with 200 when data is given', async function (done) {
            const data = { latitude: 23.1, longitude: -21.1, time: (new Date()).getTime() }
            request(app)
                .post('/location')
                .send(data)
                .set("Content-Type", "application/json")
                .expect(200, data, done)
        });

        it('responds with 415 when text/plan as the media type is given ', async function (done) {
            const data = { latitude: 23.1, longitude: -21.1, time: (new Date()).getTime() }
            request(app)
                .post('/location')
                .set("Content-Type", "text/plain")
                .send(JSON.stringify(data))
                .expect(415, done)
        });

        it('responds with 400 when time is a float', async function (done) {
            const data = { latitude: 23.1, longitude: -21.1, time: (new Date()).getTime() + 0.1 }
            request(app)
                .post('/location')
                .set("Content-Type", "application/json")
                .send(data)
                .expect(400, done)
        });

        it('responds with 400 when time is a string', async function (done) {
            const data = { latitude: 23.1, longitude: -21.1, time: 'peter' }
            request(app)
                .post('/location')
                .set("Content-Type", "application/json")
                .send(data)
                .expect(400, done)
        });

        it('responds with 400 when latitude is less than -85', async function (done) {
            const data = { latitude: -85.1, longitude: -21.1, time: (new Date()).getTime() }
            request(app)
                .post('/location')
                .set("Content-Type", "application/json")
                .send(data)
                .expect(400, done)
        });

        it('responds with 400 when latitude is less than -85', async function (done) {
            const data = { latitude: -85.1, longitude: -21.1, time: (new Date()).getTime() }
            request(app)
                .post('/location')
                .set("Content-Type", "application/json")
                .send(data)
                .expect(400, done)
        });

        it('responds with 400 when latitude is higher than 85', async function (done) {
            const data = { latitude: 85.1, longitude: -21.1, time: (new Date()).getTime() }
            request(app)
                .post('/location')
                .set("Content-Type", "application/json")
                .send(data)
                .expect(400, done)
        });

        it('responds with 400 when longitude is less than -180', async function (done) {
            const data = { latitude: 5.1, longitude: -180.1, time: (new Date()).getTime() }
            request(app)
                .post('/location')
                .set("Content-Type", "application/json")
                .send(data)
                .expect(400, done)
        });

        it('responds with 400 when longitude is higher than 180', async function (done) {
            const data = { latitude: 5.1, longitude: 180.1, time: (new Date()).getTime() }
            request(app)
                .post('/location')
                .set("Content-Type", "application/json")
                .send(data)
                .expect(400, done)
        });
    });
})