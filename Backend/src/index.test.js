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
  let reservationId, ressource = "100", resDate = new Date()

  // different tests
  test('POST /reservation returns 201', async () => {
    const res = await client.post('/reservation', {date: resDate, ressource});
    expect(res.status).toBe(201);
    expect(res.data.status).toEqual("reservation booked!");
    reserverationId = res.data.id
  });
  test('GET /reservation returns 200', async () => {
    const res = await client.get('/reservation');
    expect(res.status).toBe(200);
    expect(res.data.status).toEqual("reservations found");
    expect(res.data.reservations[0].id).toEqual(reservationId);
  });
  test('GET /reservation/ressource returns 200', async () => {
    const res = await client.get('/reservation/ressource/'+ressource);
    expect(res.status).toBe(200);
    expect(res.data.status).toEqual("reservations found");
    expect(res.data.reservations[0].id).toEqual(reservationId);
});
test('GET /reservation/date returns 200', async () => {
  const res = await client.get('/reservation/date/'+resDate);
  expect(res.status).toBe(200);
  expect(res.data.status).toEqual("reservations found");
  expect(res.data.reservations[0].id).toEqual(reservationId);
});
test('DELETE /reservation returns 200', async () => {
    const res = await client.delete('/reservation/'+reservationId);
    expect(res.status).toBe(200);
    expect(res.data.status).toEqual("reservation deleted");
});

});