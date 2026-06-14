import express from 'express';

import {Request, Response} from 'express';

import { planoDeAulaRotas } from './modulos/planos-de-aula/plano-de-aula.rotas';

const app = express();

app.use(express.json());

app.get('/' , (req: Request, res: Response) => {
    return res.json({
        mensagem: 'Hello World! API MeuPlano.AI funcionando.'
    });
});

app.use('/planos-de-aula' , planoDeAulaRotas);

export default app;