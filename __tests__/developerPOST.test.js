const frisby = require('frisby');
const shell = require('shelljs');
const devs = require('./utils/devs');
require('dotenv').config();

const URL = process.env.USER_URL || 'http://localhost:3000/developer';

describe('Verifica o método POST da URL "/developer"', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
  });

  afterAll(() => {
    shell.exec('npx sequelize-cli db:migrate:undo:all');
    shell.exec('npx sequelize-cli db:migrate');
  });

  it('Verifica se o  status é 200 quando todos os campos são passados corretamente', async () => {
    const response = await frisby.post(URL, devs[0]);

    expect(response.status).toBe(200);
  });

  it('Verifica se o retorno é o objeto que acabou de ser armazenado ao BD', async () => {
    const { json } = await frisby.post(URL, devs[0]);

    expect(json.id).toBe(1);
    expect(json.name).toBe('Pablo');
    expect(json.telphone_number).toBe('24 3512-2351');
    expect(json.celphone_number).toBe('21 95512-3321');
  });
});