'use strict'

const supertest = require('supertest');
const { db, Clothes } = require('../src/models');
const server = require('../src/server');
const mockRequest = supertest(server.server);

beforeAll(async () => {
  await db.sync();
  await Clothes.bulkCreate([
    {
      id: 0,
      name: 'Jeans',
      price: 159.99,
      designer: 'True Religion',
      createdAt: new Date('2021-10-20'),
      updatedAt: new Date('2021-10-21'),
    },
    {
      id: 1,
      name: 'Leather Belt',
      price: 180.00,
      designer: 'Amiri',
      createdAt: new Date('2021-10-21'),
      updatedAt: new Date('2021-10-22'),
    }, 
    {
      id: 2,
      name: 'Air Force Ones',
      price: 70.00,
      designer: 'Nike',
      createdAt: new Date('2021-10-23'),
      updatedAt: new Date('2021-10-24'),
    }
  ]);
});

afterAll(async () => {
  await db.drop();
});

describe('Given /clothes', () => {
  describe('When GET', () => {
    it('returns correct response body & status', async () => {
      const response = await mockRequest.get('/clothes');
      expect(response.status).toStrictEqual(200);
      expect(response.body).toStrictEqual(
        [{
          id: 0,
          name: 'Jeans',
          price: 159.99,
          designer: 'True Religion',
          createdAt: '2021-10-20T00:00:00.000Z',
          updatedAt: '2021-10-21T00:00:00.000Z'
        },
        {
          id: 1,
          name: 'Leather Belt',
          price: 180,
          designer: 'Amiri',
          createdAt: '2021-10-21T00:00:00.000Z',
          updatedAt: '2021-10-22T00:00:00.000Z'
        },
        {
          id: 2,
          name: 'Air Force Ones',
          price: 70,
          designer: 'Nike',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        }]
      );
    });
  });

  describe('When POST', () => {
    it('returns correct response body & status', async () => {
      const requestBody = {
        name: 'Chuck Taylors',
        price: 59.95,
        designer: 'Converse'
      }
      const response = await mockRequest.post('/clothes').send(requestBody);
      expect(response.status).toStrictEqual(200);
      expect(response.body.name).toStrictEqual('Chuck Taylors');
      expect(response.body.price).toStrictEqual(59.95);
      expect(response.body.designer).toStrictEqual('Converse');
      expect(response.body.id).toStrictEqual(3);
    });
  });
});

describe('Given /clothes/:id', () => {
  describe('When GET', () => {
    it('returns correct response body & status', async () => {
      const response = await mockRequest.get('/clothes/1');
      expect(response.status).toStrictEqual(200);
      expect(response.body).toStrictEqual(
        {
          id: 1,
          name: 'Leather Belt',
          price: 180,
          designer: 'Amiri',
          createdAt: '2021-10-21T00:00:00.000Z',
          updatedAt: '2021-10-22T00:00:00.000Z'
        }
      );
    });
  });

  describe('When PUT', () => {
    it('returns correct response body & status', async () => {
      const requestBody = {
        name: 'Royal Oak',
        price: 289950.00,
        designer: 'Audemars Piguet'
      }
      const response = await mockRequest.put('/clothes/1').send(requestBody);
      expect(response.status).toStrictEqual(200);
      expect(response.body.name).toStrictEqual('Royal Oak');
      expect(response.body.price).toStrictEqual(289950);
      expect(response.body.designer).toStrictEqual('Audemars Piguet');
      expect(response.body.id).toStrictEqual(1);
    });
  });

  describe('When DELETE', () => {
    it('returns correct response body & status', async () => {
      const response = await mockRequest.delete('/clothes/1');
      expect(response.status).toStrictEqual(200);
      expect(response.body).toStrictEqual(1);
    });
  });
});