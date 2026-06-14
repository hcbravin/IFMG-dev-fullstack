import { Router } from 'express'; 

import { PlanoDeAulaControlador } from './plano-de-aula.controlador';

const planoDeAulaRotas = Router();

const planoDeAulaControlador = new PlanoDeAulaControlador();

// POST /planos-de-aula/rascunho
planoDeAulaRotas.post('/rascunho' , planoDeAulaControlador.gerarRascunho);

export { planoDeAulaRotas };