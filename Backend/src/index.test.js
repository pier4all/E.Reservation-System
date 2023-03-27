const { spawn } = require('child_process');
const waitOn = require('wait-on');
const axios = require('axios');

jest.setTimeout(30000);

describe('express', () => {
  let start;
  let client;

  //create localhost
  beforeAll(async () => {
    client = axios.create({ baseURL: 'http://localhost:9000', validateStatus: () => true });
    start = spawn('npm', ['start'], { cwd: __dirname, detached: true, stdio: 'inherit' });
    await waitOn({ resources: ['tcp:localhost:9000'] });
    // cache bereits vorladen
  });

  afterAll(() => process.kill(-start.pid));

  // different tests 
  test('GET /reservation returns 200 with matched operation', async () => {
    const res = await client.get('/reservation');
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ operationId: 'getReservation' });
  });

  test('GET /reservation/ returns 200 with matched operation', async () => {
    const res = await client.get('/reservation/1');
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ operationId: 'getReservationById' });
  });

  test('GET /reservation/1a returns 400 with validation error', async () => {
    const res = await client.get('/reservation/1a');
    expect(res.status).toBe(400);
    expect(res.data).toHaveProperty('err');
  });

  test('GET /unknown returns 404', async () => {
    const res = await client.get('/unknown');
    expect(res.status).toBe(404);
    expect(res.data).toHaveProperty('err');
  });
});