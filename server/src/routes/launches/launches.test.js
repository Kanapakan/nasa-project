const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
	test('should response with 200 success', async () => {
		const response = await request(app)
			.get('/launches')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});

describe('Test POST /launches', () => {
	const completeLaunchData = {
		mission: 'USS Enterprise',
		rocket: 'NCC 1701',
		target: 'Kepler-186 f',
		launchDate: 'January 13, 2000'
	};

	const launchDataWithoutDate = {
		mission: 'USS Enterprise',
		rocket: 'NCC 1701',
		target: 'Kepler-186 f',
	};

	const launchDataWithInvalidDate = {
		mission: 'USS Enterprise',
		rocket: 'NCC 1701',
		target: 'Kepler-186 f',
		launchDate: 'xxx'
	};

	test('should with 201 created', async () => {
		const response = await request(app)
			.post('/launches')
			.send(completeLaunchData)
			.expect('Content-Type', /json/)
			.expect(201);

		const requestDate = new Date(completeLaunchData.launchDate).valueOf();
		const responsetDate = new Date(response.body.launchDate).valueOf();

		expect(responsetDate).toBe(requestDate);
		expect(response.body).toMatchObject(launchDataWithoutDate);
	});


	test('should catch missing required properties', async () => {
		const response = await request(app)
			.post('/launches')
			.send(launchDataWithoutDate)
			.expect('Content-Type', /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: 'Missing required launch property',
		})
	});

	test('should catch invalid dates', async () => {
		const response = await request(app)
			.post('/launches')
			.send(launchDataWithInvalidDate)
			.expect('Content-Type', /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: 'Invalid launch date',
		})
	});
});