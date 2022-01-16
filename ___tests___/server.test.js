'use strict';

const { db } = require('../src/models/index.js');
const supertest = require('supertest');
const server = require('../src/server.js');
const { expect } = require('@jest/globals');

const request = supertest(server.server);

beforeAll( async () => {
  await db.sync();
});
 
afterAll(async () => {
  await db.drop();
});

describe('Testing our server', () => {

  //The correct status codes and returned data for each REST route(game/food)
  it('should respond with a 200 for GET /games', async () => {
    const response = await request.get('/games');
    expect(response.status).toBe(200);
  });


  it('should respond with a 200 for GET /food', async () => {
    const response = await request.get('/food');
    expect(response.status).toBe(200);
  });
  
  // Create a record using POST(both games and foods)
  it('should respond with a 200 for POST /games', async () => {
    const response = await request.post('/games').send({
      name: 'Valorant',
      price: 0.0,
      rating: 'horrible',
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Valorant')
  });

  it('should respond with a 200 for POST on /food', async () => {
    const response = await request.post('/food').send({
      name: 'Entenmanns Little Bites',
      price: 3.29,
      inStock: false,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Entenmanns Little Bites')
  });
  
  // Read a list of records using GET
  it('should respond with a 200 for GET /games/:id', async () => {
    const response = await request.get('/games/:id');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Valorant')
  });

  it('should respond with a 200 for GET on /food/:id', async () => {
    const response = await request.get('/food/:id');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Entenmanns Little Bites');
  });

  // Update a record using PUT
  it('should respond with a 200 for PUT on /games/:id', async () => {
    const response = await request.put('/games/:id').send({
      name: 'updating',
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('updating')
  });

  it('should respond with a 200 for PUT on /food/:id', async () => {
    const response = await request.put('/food/:id').send({
      name: 'updating'
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('updating')
  });

  // Destroy a record using DELETE
  it('should respond with a 200 for DELETE on /games/:id', async () => {
    const response = await request.put('/games/:id');
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 for DELETE on /food/:id', async () => {
    const response = await request.put('/food/:id');
    expect(response.status).toBe(200);
  });
});
