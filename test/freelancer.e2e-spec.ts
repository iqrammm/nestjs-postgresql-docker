import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('FreelancerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Can get all freelancer', () => {
    return request(app.getHttpServer()).get('/freelancers').expect(200);
  });

  it('Cannot get one freelancer if not created', async () => {
    return request(app.getHttpServer()).get('/freelancers/1000').expect(404);
  });

  it('Can create register new freelancer', () => {
    const params = {
      email: 'amirul+55@test.com',
      password: 'test123',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    return request(app.getHttpServer())
      .post('/freelancers/register')
      .send(params)
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(params.email);
      });
  });

  it('Cannot create same user multiple time', async () => {
    const params = {
      email: 'amirul+2@test.com',
      password: 'test123',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    await request(app.getHttpServer())
      .post('/freelancers/register')
      .send(params)
      .expect(201);

    await request(app.getHttpServer())
      .post('/freelancers/register')
      .send(params)
      .expect(400);
  });

  it('Can update existing user', async () => {
    const params = {
      email: 'amirul+3@test.com',
      password: 'test123',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    let existingUserId;

    await request(app.getHttpServer())
      .post('/freelancers/register')
      .send(params)
      .expect(201)
      .then((res) => {
        const { id } = res.body;

        existingUserId = id;
      });

    delete params.password;

    params.email = 'amirul+4@test.com';

    await request(app.getHttpServer())
      .patch(`/freelancers/${existingUserId}`)
      .send(params)
      .expect(200)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(params.email);
      });
  });

  it('Cannot update non-existing user', () => {
    const params = {
      email: 'amirul+5@test.com',
      password: 'test123',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    return request(app.getHttpServer())
      .patch(`/freelancers/50000`)
      .send(params)
      .expect(404);
  });

  it('Can delete existing user', async () => {
    const params = {
      email: 'amirul+6@test.com',
      password: 'test123',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    let existingUserId;

    await request(app.getHttpServer())
      .post('/freelancers/register')
      .send(params)
      .expect(201)
      .then((res) => {
        const { id } = res.body;

        existingUserId = id;
      });

    return request(app.getHttpServer())
      .delete(`/freelancers/${existingUserId}`)
      .expect(200);
  });

  it('Cannot delete freelancer that does not exist', async () => {
    return request(app.getHttpServer())
      .delete(`/freelancers/30000`)
      .expect(404);
  });
});
