import HereIAmService from './here-i-am-service';

describe('Test suite for the here i am service', () => {

    let hereIAmService;

    beforeEach(() => {
        hereIAmService = new HereIAmService();
    })

    describe('#saveLocation', () => {
        it('should save the location', () => {
            const now = new Date();
            const actual = hereIAmService.saveLocation(10.23404, 20.3312312, now)
            expect(actual).toStrictEqual({ latitude: 10.23404, longitude: 20.3312312, date: now });
        })

        it('should use the current date when no date is given', () => {
            const actual = hereIAmService.saveLocation(10.23, 102.23);
            expect(actual.date).toBeDefined()
        })

        it('should throw an error when latitude is not an integer', () => {
            expect(() => hereIAmService.saveLocation("peter", 10.23, new Date())).toThrow()
        })

        it('should throw an error when longitude is not an integer', () => {
            expect(() => hereIAmService.saveLocation(10, "mama", new Date())).toThrow()
        })

        it('should throw an error when latitude is less than -85', () => {
            expect(() => hereIAmService.saveLocation(-86, 23.1, new Date())).toThrow()
        });

        it('should save the location when latitude is -85', () => {
            const now = new Date()
            const actual = hereIAmService.saveLocation(-85, 23.1, now)
            expect(actual).toStrictEqual({ latitude: -85, longitude: 23.1, date: now })
        });

        it('should throw an error when latitude is more than 85', () => {
            expect(() => hereIAmService.saveLocation(86, 23.1, new Date())).toThrow()
        });

        it('should save the location when latitude is 85', () => {
            const now = new Date()
            const actual = hereIAmService.saveLocation(85, 23.1, now)
            expect(actual).toStrictEqual({ latitude: 85, longitude: 23.1, date: now })
        });

        it('should throw an error when longitude is less than -180', () => {
            expect(() => hereIAmService.saveLocation(21.12, -180.5, new Date())).toThrow()
        });

        it('should save the location when longitude is -180', () => {
            const now = new Date()
            const actual = hereIAmService.saveLocation(21.21, -180, now)
            expect(actual).toStrictEqual({ latitude: 21.21, longitude: -180, date: now })
        });

        it('should throw an error when longitude is more than 180', () => {
            expect(() => hereIAmService.saveLocation(21.12, 180.1, new Date())).toThrow()
        });

        it('should save the location when longitude is 180', () => {
            const now = new Date()
            const actual = hereIAmService.saveLocation(21.21, 180, now)
            expect(actual).toStrictEqual({ latitude: 21.21, longitude: 180, date: now })
        });

        it('should throw an error when date is of type string', () => {
            expect(() => hereIAmService.saveLocation(23.1, 22, "Test")).toThrow()
        })

        it('should throw an error when date is null', () => {
            expect(() => hereIAmService.saveLocation(23.1, 22, null)).toThrow()
        })
    })

    describe('#getLocation', () => {
        it('should get the saved location', () => {
            const latitude = 25.12
            const longitude = 23.12
            const date = new Date()
            hereIAmService.saveLocation(latitude, longitude, date)
            expect(hereIAmService.getLocation()).toStrictEqual({ latitude, longitude, date })
        });

        it('should get the latest saved location', () => {
            hereIAmService.saveLocation(23.12, 22.11, new Date())
            hereIAmService.saveLocation(1.12, 5.11, new Date())
            hereIAmService.saveLocation(-21.12, -50.11, new Date())
            const latitude = 25.12
            const longitude = 23.12
            const date = new Date()
            hereIAmService.saveLocation(latitude, longitude, date)
            expect(hereIAmService.getLocation()).toStrictEqual({ latitude, longitude, date })
        });

        it('should get null values for latitude, longitude and date when no location is saved', () => {
            expect(hereIAmService.getLocation()).toStrictEqual({ latitude: null, longitude: null, date: null })
        })
    })
})