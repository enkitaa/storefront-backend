import app from '../../server';
import supertest from 'supertest';
import { User } from '../../models/user';

const request = supertest(app);
let jwtToken: string;

describe('Test endpoint responses for /users', () => {
  const user: User = {
    first_name: 'Ankita',
    last_name: 'Singh',
    password: 'pass123'
  };
  
  it('should create user', async () => {
    const response = await request.post('/users').send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    jwtToken = response.body.token;
  });
  it('should should login with authentication', async () => {
    const response = await request.post('/users/login').send(user);
    expect(response.status).toBe(200);
  });
  it('should not login on wrong credentials passed', async () => {
    const response = await request.post('/users/login').send({
      firstname: 'Ankita',
      lastname: 'Singh',
      password: 'pass45'
    });
    expect(response.text).toBe('Wrong username/password');
  });
  it('should get user with ID', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', 'bearer ' + jwtToken)
      expect(response.status).toBe(200);
  });
  it('should get users list', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', 'bearer ' + jwtToken);
      expect(response.status).toBe(200);
  });

  it('should update user', async () => {
    const res = await request
      .put('/users/1')
      .send({
        firstname: 'Anjali',
        lastname: 'Singh',
        password: 'passwd'
      })
      .set('Authorization', 'bearer ' + jwtToken)
      expect(res.status).toBe(200);
  });

  it('should not delete user without required token', async () => {
    const res= await request.delete('/users/1')
    expect(res.status).toBe(401);
  });

  it('should delete users with token', async () => {
    const res = await request
      .delete('/users/1')
      .set('Authorization', 'bearer ' + jwtToken);
      expect(res.status).toBe(200);
  });
});