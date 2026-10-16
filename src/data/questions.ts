import { Question } from '../types.ts';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Você recebe uma tarefa que nunca realizou antes. O que faz?",
    options: [
      {
        id: "A",
        text: "Procuro entender o objetivo e começo a buscar uma forma de realizar."
      },
      {
        id: "B",
        text: "Pergunto o que for necessário e sigo as orientações para fazer corretamente."
      },
      {
        id: "C",
        text: "Observo como outras pessoas realizam e, depois, faço da minha maneira."
      },
      {
        id: "D",
        text: "Organizo as informações e procuro entender todas as etapas antes de começar."
      }
    ]
  },
  {
    id: 2,
    question: "Em um dia com muitas tarefas e bastante movimento, você:",
    options: [
      {
        id: "A",
        text: "Tento manter a calma e ajudar no que for necessário."
      },
      {
        id: "B",
        text: "Organizo as prioridades e sigo uma sequência para não esquecer nada."
      },
      {
        id: "C",
        text: "Vou direto para o que precisa ser resolvido e busco entregar rapidamente."
      },
      {
        id: "D",
        text: "Procuro interagir com as pessoas e manter uma comunicação positiva mesmo com a correria."
      }
    ]
  },
  {
    id: 3,
    question: "Um cliente está insatisfeito com uma situação. Você:",
    options: [
      {
        id: "A",
        text: "Escuto atentamente para entender todos os detalhes antes de agir."
      },
      {
        id: "B",
        text: "Procuro resolver rapidamente e apresentar uma solução."
      },
      {
        id: "C",
        text: "Mantenho a tranquilidade, escuto o cliente e tento deixá-lo confortável."
      },
      {
        id: "D",
        text: "Converso com o cliente, procuro entender o que aconteceu e conduzo o atendimento de forma positiva."
      }
    ]
  },
  {
    id: 4,
    question: "Quando trabalha em equipe, você costuma:",
    options: [
      {
        id: "A",
        text: "Assumir responsabilidades e ajudar o grupo a chegar ao resultado."
      },
      {
        id: "B",
        text: "Manter uma boa comunicação e trocar ideias com as pessoas."
      },
      {
        id: "C",
        text: "Organizar as tarefas e acompanhar se tudo está sendo feito corretamente."
      },
      {
        id: "D",
        text: "Colaborar, ouvir os colegas e contribuir para um ambiente agradável."
      }
    ]
  },
  {
    id: 5,
    question: "Quando recebe um feedback sobre algo que precisa melhorar, você:",
    options: [
      {
        id: "A",
        text: "Procuro entender exatamente o que precisa ser corrigido e como fazer melhor."
      },
      {
        id: "B",
        text: "Converso sobre o feedback e tento colocar as mudanças em prática."
      },
      {
        id: "C",
        text: "Escuto, reflito e procuro melhorar aos poucos."
      },
      {
        id: "D",
        text: "Transformo o feedback em uma ação e busco apresentar uma evolução rapidamente."
      }
    ]
  },
  {
    id: 6,
    question: "Qual situação mais combina com você no ambiente profissional?",
    options: [
      {
        id: "A",
        text: "Ter metas e desafios que me estimulem a buscar resultados."
      },
      {
        id: "B",
        text: "Trabalhar em um ambiente organizado, com processos e expectativas claras."
      },
      {
        id: "C",
        text: "Ter contato com pessoas, comunicação e oportunidades de interação."
      },
      {
        id: "D",
        text: "Trabalhar em uma equipe colaborativa, com estabilidade e bom relacionamento."
      }
    ]
  }
];
