type Prompt = {
    descricao: string;
}

class PlanoDeAulaServico {
    gerarRascunho(prompt: Prompt) {
        const { descricao } = prompt;

        void descricao;

        return {
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
    }
}

export { PlanoDeAulaServico };