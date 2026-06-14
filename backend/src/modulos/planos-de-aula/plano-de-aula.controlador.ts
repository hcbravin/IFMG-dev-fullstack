import { Request, Response } from 'express';

import { PlanoDeAulaServico } from './plano-de-aula.servico';

class PlanoDeAulaControlador {
    private planoDeAulaServico: PlanoDeAulaServico;

    constructor() {
        this.planoDeAulaServico = new PlanoDeAulaServico();
    }

    gerarRascunho = (req: Request, res: Response) => {
        const { descricao } = req.body;

        if (typeof descricao !== 'string' || descricao.trim().length < 10) {
            return res.status(400).json({
                "sucesso": false,
                "mensagem": "A descrição deve ter pelo menos 10 caracteres."
            });
        }

        const rascunho = this.planoDeAulaServico.gerarRascunho({
            descricao
        });

        return res.status(200).json({
            "sucesso": true,
            "mensagem": "Rascunho do plano de aula gerado com sucesso.",
            "dados": rascunho,
        });
    };
}

export { PlanoDeAulaControlador };