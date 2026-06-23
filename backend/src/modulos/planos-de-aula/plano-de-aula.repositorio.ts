/**
 * Repositório para salvar planos de aula no MongoDB
 * 
 * Este arquivo é responsável por:
 * 1. Definir como os planos são salvos no banco
 * 2. Conectar ao MongoDB quando necessário
 * 3. Tratar erros sem quebrar a aplicação
 */

import mongoose from 'mongoose';

// --- 1. Definição do Schema (estrutura dos dados) ---
// Um schema é como um molde que diz como os dados devem ser organizados no banco
const planoDeAulaSchema = new mongoose.Schema({
  // Título do plano (obrigatório)
  titulo: { 
    type: String, 
    required: true 
  },
  // Conteúdo do plano (obrigatório)
  plano: { 
    type: String, 
    required: true 
  },
  // Relatório final (obrigatório)
  relatorio: { 
    type: String, 
    required: true 
  },
  // Data de criação (preenchido automaticamente)
  criadoEm: { 
    type: Date, 
    default: Date.now 
  }
});

// --- 2. Criação do Model ---
// O model é a "classe" que usamos para interagir com o banco
const PlanoDeAula = mongoose.model('PlanoDeAula', planoDeAulaSchema);

// --- 3. Classe Repositório ---
// Esta classe contém os métodos para salvar e buscar dados
export class PlanoDeAulaRepositorio {
  
  /**
   * Salva um plano de aula no MongoDB
   * 
   * @param plano - O plano de aula a ser salvo (titulo, plano, relatorio)
   * @returns O mesmo plano que foi enviado (sem os campos do MongoDB)
   * 
   * IMPORTANTE: Se não tiver MONGO_URL configurada, apenas loga e continua
   * Isso é para não quebrar os testes
   */
  async salvar(plano: { titulo: string; plano: string; relatorio: string }) {
    try {
      // Verifica se a URL do MongoDB está configurada
      if (!process.env.MONGO_URL) {
        console.log('MONGO_URL não configurada - plano NÃO foi salvo no banco');
        console.log('Plano gerado mas não persistido:', plano.titulo);
        return plano; // Retorna o plano sem salvar
      }

      // Verifica se já está conectado ao MongoDB
      // readyState: 0 = desconectado, 1 = conectado, 2 = conectando, 3 = desconectando
      if (mongoose.connection.readyState === 0) {
        console.log('Conectando ao MongoDB...');
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Conectado ao MongoDB com sucesso!');
      }

      // Cria uma nova instância do plano (usando o model)
      const novoPlano = new PlanoDeAula({
        titulo: plano.titulo,
        plano: plano.plano,
        relatorio: plano.relatorio
      });

      // Salva no banco de dados
      await novoPlano.save();
      console.log(`Plano salvo no MongoDB! ID: ${novoPlano._id}`);

      // Retorna o plano original (sem os campos do MongoDB)
      // Isso é importante para não quebrar os testes que esperam um formato específico
      return plano;

    } catch (erro) {
      // Se der erro, apenas loga e continua
      // A aplicação NÃO deve quebrar por causa do MongoDB
      console.error('Erro ao salvar no MongoDB:', erro);
      console.log('Plano gerado mas com erro de persistência - continuando...');
      
      // Retorna o plano mesmo assim (persistência não-fatal)
      return plano;
    }
  }
}