import request from 'supertest';

import app from '../../../src/app';

describe('POST /planos-de-aula/rascunho', () => {
    it('deve gerar um rascunho de plano de aula a partir de uma descrição em linguagem natural', async () => {
        const resposta = await request(app)
            .post('/planos-de-aula/rascunho')
            .send({
                descricao: "Quero uma aula de 45 minutos sobre inteligência artificial para alunos do ensino médio."
            });

        expect(resposta.status).toBe(200);
    });

    it('deve retornar erro 400 quando a descrição não for enviada', async () => {
        const resposta = await request(app)
            .post('/planos-de-aula/rascunho')
            .send({});

        expect(resposta.status).toBe(400);
    });

    it('deve retornar erro 400 quando a descrição tiver menos de 10 caracteres', async () => {
        const resposta = await request(app)
            .post('/planos-de-aula/rascunho')
            .send({
                descricao: 'Aula',
            });

        expect(resposta.status).toBe(400);
    })


});