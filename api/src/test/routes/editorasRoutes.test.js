import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;
let idEditoraCriada;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(server)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
    expect(resposta.body[1].email).toEqual('m@m.com');
    expect(resposta.body[2].email).toEqual('al@al.com');
    expect(resposta.body[3].email).toEqual('a@a.com');
  });
});

describe('GET em /editoras/{id}', () => {
  it('Deve retornar o recurso selecionado', async () => {
    await request(server)
      .get('/editoras/1')
      .expect(200);
  });
});

describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(server)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 's@s.com',
      })
      .expect(201);

    idEditoraCriada = resposta.body.content.id;
  });

  it('Não deve adicionar nada ao passar body vazio', async () => {
    await request(server)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('PUT em /editoras/{id}', () => {
  it.each([
    ['nome', { nome: 'Casa do Código' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve alterar o campo %s', async (_chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(server).put(`/editoras/${idEditoraCriada}`).send(param).expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editoras/{id}', () => {
  it('Deve deletar o recurso adicionado', async () => {
    await request(server)
      .delete(`/editoras/${idEditoraCriada}`)
      .expect(200);
  });
});
