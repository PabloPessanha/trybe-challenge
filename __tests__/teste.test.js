const frisby = require('frisby');
const devs = require('../utils/devs');
require('dotenv').config();

const URL = process.env.USER_URL || 'http://localhost:3000/developer';

describe('Verifica o método POST da URL "/developer"', () => {
  it('Verifica se o  status é 200 quando todos os campos são passados corretamente', async () => {
    let response = await frisby.post(URL, devs[0]);
    const firstPerson = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(firstPerson.id).toBe(1);
    expect(firstPerson.name).toBe('Pablo');

    response = await frisby.post(URL, devs[1]);
    const secondPerson = JSON.parse(response.body);
    expect(response.status).toBe(200);
    expect(secondPerson.id).toBe(2);
    expect(secondPerson.name).toBe('Renato');
  });

  it('Verifica se o retorno de dado é correto', async () => {

  });
});