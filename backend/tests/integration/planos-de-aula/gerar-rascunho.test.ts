import request from 'supertest';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import app from '../../../src/app';

// vi.hoisted cria este mock ANTES de qualquer importação do arquivo.
const { gerarJsonMock } = vi.hoisted(() => {
    return {
        gerarJsonMock: vi.fn(),
    };
});

// Substitui o módulo do serviço de IA por uma versão falsa (mock).
vi.mock('../../../src/modulos/ia/ia.servico', () => {
    class IaServicoFalso {
        gerarJson = gerarJsonMock;
    }

    return {
        IaServico: IaServicoFalso,
    };
});

describe('POST /planos-de-aula/rascunho', () => {
    beforeEach(() => {
        gerarJsonMock.mockReset();
    });

    it('deve gerar um rascunho de plano de aula a partir de uma descrição em linguagem natural', async () => {
        const rascunhoGeradoPelaIa = {
            titulo: 'Introdução à Inteligência Artificial',
            disciplina: 'Informática',
            curso: 'Ensino Médio',
            nivel: '1º ano',
            duracao: '45 minutos',
            tema: 'Inteligência Artificial',
            objetivos: [
                'Compreender o conceito de Inteligência Artificial.',
                'Identificar aplicações de IA no cotidiano.',
            ],
            conteudos: [
                'Conceito de Inteligência Artificial',
                'Exemplos de aplicações práticas',
                'Impactos sociais da IA',
            ],
            metodologia:
                'Aula expositiva dialogada com exemplos práticos e discussão orientada.',
            recursos: ['Projetor', 'Computador', 'Internet'],
            avaliacao:
                'Participação dos estudantes e produção de uma síntese individual.',
        };

        gerarJsonMock.mockResolvedValue(rascunhoGeradoPelaIa);

        const resposta = await request(app)
            .post('/planos-de-aula/rascunho')
            .send({
                descricao: "Quero uma aula de 45 minutos sobre inteligência artificial para alunos do ensino médio."
            });

        expect(resposta.status).toBe(200);

        expect(resposta.body).toEqual({
            sucesso: true,
            mensagem: 'Rascunho do plano de aula gerado com sucesso.',
            dados: rascunhoGeradoPelaIa,
        });

        expect(gerarJsonMock).toHaveBeenCalledTimes(1);
    });

    it('deve retornar erro 400 quando a descrição não for enviada', async () => {
        const resposta = await request(app)
            .post('/planos-de-aula/rascunho')
            .send({});

        expect(resposta.status).toBe(400);

        expect(resposta.body).toEqual({
            sucesso: false,
            mensagem: 'A descrição deve ter pelo menos 10 caracteres.',
        });

        expect(gerarJsonMock).not.toHaveBeenCalled();
    });

    it('deve retornar erro 400 quando a descrição tiver menos de 10 caracteres', async () => {
        const resposta = await request(app)
            .post('/planos-de-aula/rascunho')
            .send({
                descricao: 'Aula',
            });

        expect(resposta.status).toBe(400);

        expect(resposta.body).toEqual({
            sucesso: false,
            mensagem: 'A descrição deve ter pelo menos 10 caracteres.',
        });

        expect(gerarJsonMock).not.toHaveBeenCalled();
    })

    it('deve retornar erro 500 quando o serviço de IA falhar', async () => {
        gerarJsonMock.mockRejectedValue(new Error('Falha simulada na IA.'));
        
        const resposta = await request(app)
            .post('/planos-de-aula/rascunho')
            .send({
                descricao:
                    'Quero uma aula de 45 minutos sobre inteligência artificial para alunos do ensino médio.',
            });

        expect(resposta.status).toBe(500);

        expect(resposta.body).toEqual({
            sucesso: false,
            mensagem: 'Falha simulada na IA.',
            dados: null,
        });
    });
});