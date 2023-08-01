import { ref } from 'vue';
import { defineStore } from 'pinia';
import { timeout } from '@/utils';

export type Evaluations = {
  data: {
    quantity: 923;
    recentReviewsQuantity: 486;
    evaluations: [
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 6176;
        customer: {
          name: 'Flavio';
        };
        commentDate: 1690736020173;
        moderated: false;
        orderDeliveryDate: 1690636466688;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 8227;
        customer: {
          name: 'TATIANA';
        };
        commentDate: 1690674696923;
        moderated: false;
        orderDeliveryDate: 1690209355078;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 9447;
        customer: {
          name: 'isa';
        };
        commentDate: 1690667957182;
        moderated: false;
        orderDeliveryDate: 1690562173477;
        questionsValueAvg: '4.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 8;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'O que pode melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 4;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 6432;
        customer: {
          name: 'Lucas';
        };
        commentDate: 1690651701906;
        moderated: false;
        orderDeliveryDate: 1690555079935;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 5887;
        customer: {
          name: 'Wesley';
        };
        commentDate: 1690649269666;
        moderated: false;
        orderDeliveryDate: 1690387591322;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 6185;
        customer: {
          name: 'Samara';
        };
        commentDate: 1690649199143;
        moderated: false;
        orderDeliveryDate: 1690644030481;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 8761;
        customer: {
          name: 'Jhon';
        };
        commentDate: 1690646987262;
        moderated: false;
        orderDeliveryDate: 1690643342224;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 8471;
        customer: {
          name: 'Patrícia';
        };
        commentDate: 1690642019028;
        moderated: false;
        orderDeliveryDate: 1690636460172;
        questionsValueAvg: '4.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 9;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'O que pode melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 4;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 6897;
        customer: {
          name: 'GABRIELLY';
        };
        commentDate: 1690592867678;
        moderated: false;
        orderDeliveryDate: 1690291574005;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 3827;
        customer: {
          name: 'LUDMILA';
        };
        commentDate: 1690589242564;
        moderated: false;
        orderDeliveryDate: 1690037951795;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 9;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 1345;
        customer: {
          name: 'RAYANE';
        };
        commentDate: 1690570168254;
        moderated: false;
        orderDeliveryDate: 1690558278241;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 8740;
        customer: {
          name: 'Joao';
        };
        commentDate: 1690564362574;
        moderated: false;
        orderDeliveryDate: 1690560419724;
        questionsValueAvg: '3.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: '';
              description: 'O que pode melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 3;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 8;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 7433;
        customer: {
          name: 'vitor';
        };
        commentDate: 1690561233978;
        moderated: false;
        orderDeliveryDate: 1690554199609;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 3175;
        customer: {
          name: 'Sanderli';
        };
        commentDate: 1690560548518;
        moderated: false;
        orderDeliveryDate: 1690556215886;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 7386;
        customer: {
          name: 'Sineide';
        };
        commentDate: 1690557797250;
        moderated: false;
        orderDeliveryDate: 1690552791616;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 9;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 9764;
        customer: {
          name: 'vitor';
        };
        commentDate: 1690494975427;
        moderated: false;
        orderDeliveryDate: 1690469395722;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 4553;
        customer: {
          name: 'Matheus';
        };
        commentDate: 1690477268132;
        moderated: false;
        orderDeliveryDate: 1690471892724;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 8315;
        customer: {
          name: 'RODRIGO';
        };
        commentDate: 1690476483650;
        moderated: false;
        orderDeliveryDate: 1690470615417;
        questionsValueAvg: '4.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 8;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 4;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 7782;
        customer: {
          name: 'Ana';
        };
        commentDate: 1690474688040;
        moderated: false;
        orderDeliveryDate: 1690471087516;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 7797;
        customer: {
          name: 'Carlos';
        };
        commentDate: 1690473568697;
        moderated: false;
        orderDeliveryDate: 1690296979421;
        questionsValueAvg: '3.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 2;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Quais pontos poderiam melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 3;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 6402;
        customer: {
          name: 'Wagner';
        };
        commentDate: 1690392792481;
        moderated: false;
        orderDeliveryDate: 1689956006658;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 0;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 3251;
        customer: {
          name: 'Mateus';
        };
        commentDate: 1690389428338;
        moderated: false;
        orderDeliveryDate: 1690381807182;
        questionsValueAvg: '4.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 7;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Quais pontos poderiam melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'O que pode melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 4;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 3169;
        customer: {
          name: 'vitor';
        };
        commentDate: 1690387173011;
        moderated: false;
        orderDeliveryDate: 1690384011261;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 6117;
        customer: {
          name: 'DANYELA';
        };
        commentDate: 1690386651483;
        moderated: false;
        orderDeliveryDate: 1690295373790;
        questionsValueAvg: '3.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Quais pontos poderiam melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'O que pode melhorar?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 3;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 9367;
        customer: {
          name: 'vitor';
        };
        commentDate: 1690385411588;
        moderated: false;
        orderDeliveryDate: 1690210348465;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 310;
        customer: {
          name: 'NANA';
        };
        commentDate: 1690385181546;
        moderated: false;
        orderDeliveryDate: 1690381006501;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 4785;
        customer: {
          name: 'Anderson';
        };
        commentDate: 1690384935328;
        moderated: false;
        orderDeliveryDate: 1690380288785;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 7900;
        customer: {
          name: 'Filipe';
        };
        commentDate: 1690383635080;
        moderated: false;
        orderDeliveryDate: 1690293581666;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 8;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 5252;
        customer: {
          name: 'Leandro';
        };
        commentDate: 1690296519159;
        moderated: false;
        orderDeliveryDate: 1690208550528;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 9;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
      {
        restaurant: {
          id: 0;
          uuid: '0bf2303a-9c85-4e7d-9cc3-01182e074a64';
        };
        orderNumber: 2328;
        customer: {
          name: 'GRACIELLE';
        };
        commentDate: 1690296209389;
        moderated: false;
        orderDeliveryDate: 1689778968221;
        questionsValueAvg: '5.0';
        evaluationItens: [
          {
            evaluationCriteria: {
              title: 'Avalie o iFood também';
              description: 'Em uma escala de 0 a 10, qual é a chance de você indicar o iFood para um amigo?';
              type: '0-10';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            grade: 10;
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você mais gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: '';
              description: 'Do que você gostou?';
              type: '0-0';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: false;
              toGo: true;
            };
            count: 1;
          },
          {
            evaluationCriteria: {
              title: 'O que você achou do pedido?';
              description: 'Escolha de 1 a 5 estrelas para classificar.';
              type: '1-5';
              delivery: true;
              togo: true;
              callCenter: true;
              site: true;
              restaurant: true;
              toGo: true;
            };
            grade: 5;
            count: 1;
          },
        ];
        surveyId: 'e1686786-b7aa-4d9f-a060-48f67e789df9';
        status: 'ACE';
        visible: false;
      },
    ];
    evaluationsAverages: [
      {
        evaluationCriteria: {
          title: 'Embalagem';
          description: 'Embalagem';
          type: '1-5';
          delivery: true;
          togo: true;
          callCenter: true;
          site: true;
          restaurant: true;
          toGo: true;
        };
        grade: 4.4;
        count: 923;
      },
      {
        evaluationCriteria: {
          title: 'Tempo de entrega';
          description: 'Tempo de entrega';
          type: '1-5';
          delivery: true;
          togo: true;
          callCenter: true;
          site: true;
          restaurant: true;
          toGo: true;
        };
        grade: 4.4;
        count: 923;
      },
      {
        evaluationCriteria: {
          title: 'Custo/Benefício';
          description: 'Custo/Benefício';
          type: '1-5';
          delivery: true;
          togo: true;
          callCenter: true;
          site: true;
          restaurant: true;
          toGo: true;
        };
        grade: 4.4;
        count: 923;
      },
      {
        evaluationCriteria: {
          title: 'Como foi sua experiência';
          description: 'Como foi sua experiência';
          type: '1-5';
          delivery: true;
          togo: true;
          callCenter: true;
          site: true;
          restaurant: true;
          toGo: true;
        };
        grade: 4.4;
        count: 923;
      },
    ];
    size: 484;
  };
};

export const useEvaluationsStore = defineStore('evaluations', () => {
  /* state */
  const evaluations = ref<Evaluations | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  /* getters */

  /* actions */
  const fetch = async (): Promise<void> => {
    loading.value = true;
    try {
      await timeout(500);
      evaluations.value = null;
    } catch (e: any) {
      error.value = e.toString();
      evaluations.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    /* state */
    evaluations,
    loading,
    error,

    /* getters */

    /* actions */
    fetch,
  };
});
