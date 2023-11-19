import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

let jwt: string;

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'viki2@viki.viki',
			password: '12345',
		});
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'viki2@viki.viki',
			password: '12345',
		});
		jwt = res.body.jwt;

		expect(res.body.jwt).not.toBeUndefined();
		expect(res.statusCode).toBe(200);
	});

	it('Login - error', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'viki2@viki.viki',
			password: 'wrong',
		});
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'viki2@viki.viki',
			password: '12345',
		});

		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.email).toBe('viki2@viki.viki');
		expect(res.statusCode).toBe(200);
	});

	it('Info - error', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer null`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
