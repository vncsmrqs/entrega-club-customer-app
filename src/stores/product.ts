import { reactive } from 'vue';
import { defineStore } from 'pinia';

export type Product = {
  id: string;
  name: string;
  available: boolean;
  description: string;
  preparationTime: number;
  originalUnitPrice: number;
  unitPrice: number;
  imageUrl?: string;
  choices?: Choice[];
};

export type Choice = {
  id: string;
  name: string;
  max: number;
  min: number;
  garnishItems: GarnishItem[];
};

export type GarnishItem = {
  id: string;
  name: string;
  description?: string;
  unitPrice?: number;
  imageUrl?: string;
};

export const productFixture: Product = {
  id: 'be77bc92-7ef5-446f-8795-149541f2d574',
  name: '2 Sanduíches Favoritos + Batata',
  description:
    '2 sanduíches (Escolha um Sanduíche entre: Whopper, Chicken Duplo, Rodeio Duplo, Big King, Whopper de plantas, Stacker Duplo e Cheeseburger Duplo) + 1 Batata Frita + 1 Bebida.',
  available: true,
  preparationTime: 10,
  unitPrice: 48.9,
  originalUnitPrice: 63.9,
  imageUrl: '/images/product/default.png',
  choices: [
    {
      id: '65FFB8',
      name: 'Escolha seus sanduíches:',
      min: 2,
      max: 2,
      garnishItems: [
        {
          id: 'eec6d177-e2e2-4916-8895-f4160dfc4d9f',
          name: 'Chicken Duplo',
          description:
            '2 frangos crocantes, queijo derretido, salada fresca (alface) e maionese Bk.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: '58fe5e37-29ba-44db-a068-9340facfb3fb',
          name: 'Rodeio Duplo',
          description:
            'Um hambúrguer de carne bovina grelhada de 57g, pão com gergelim, queijo derretido, onion rings, molho barbecue e maionese bk.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 1,
        },
        {
          id: '1c5a702e-5792-47f2-9a76-c83664798e96',
          name: 'Whopper',
          description:
            'Um hambúrguer com uma carne bovina grelhada de 113g, pão com gergelim, queijo derretido, picles, salada fresca (alface, cebola, tomate), ketchup e maionese bk.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 2,
        },
        {
          id: 'c4fe3148-e0a6-4730-bdb2-328ac3e6ed9f',
          name: 'Stacker Duplo',
          description:
            'Um hambúrguer com duas carnes bovinas grelhadas de 57g, pão com gergelim, queijo derretido, fatias de bacon crocante e o exclusivo molho bk stacker.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 2,
        },
        {
          id: '2a0d7ae6-8dc0-4820-a454-f7c7c72af67a',
          name: 'Chicken Crispy',
          description:
            'Pão de brioche, um delicioso e suculento filé de peito de frango crocante, maionese e alface.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 2,
        },
        {
          id: '86ddc9a0-8575-4978-923a-23d2e76a428e',
          name: 'Cheeseburger Duplo',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
      ],
    },
    {
      id: 'F38965',
      name: 'Escolha o acompanhamento:',
      min: 1,
      max: 1,
      garnishItems: [
        {
          id: '250ca2b4-8847-424b-933f-17aad45fdbe3',
          name: 'Batata Média',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
      ],
    },
    {
      id: '207E97',
      name: 'Escolha sua Bebida',
      min: 1,
      max: 1,
      garnishItems: [
        {
          id: '88d038e7-39a7-4b21-984a-a0c81fab52da',
          name: 'Pepsi Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: 'f054ca16-24b7-4edf-baaf-83b68dd9ddf5',
          name: 'Pepsi Black Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: '5f65277f-483a-4d62-ad4b-a2564737dcf1',
          name: 'Guaraná Antarctica Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: 'd40076a7-084f-4d06-9c0c-5bf3d3416b2d',
          name: 'Guaraná Antarctica Zero Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: 'aed2a43c-2b04-40b0-ba87-90ff61391705',
          name: 'H2oh Limão - 500 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 1,
        },
      ],
    },
    {
      id: '990CD3',
      name: 'Deseja incrementar seu pedido?',
      min: 1,
      max: 1,
      garnishItems: [
        {
          id: '55d031ba-3241-4395-a86b-44d0eb60c7c5',
          name: 'Rodeio',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: '1f5de79c-a821-4cd6-afe1-f346e0473126',
          name: 'Cheeseburger',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: 'af5a0a6e-d1a0-4d7d-98cb-0ce9657572cc',
          name: 'Chicken jr',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: '7a469ee4-aa3a-4372-933a-78b831d757c0',
          name: 'Cheddar Jr',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: '0a529768-6f18-4017-acb7-40204b9727b4',
          name: 'Não, Obrigado!',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
      ],
    },
    {
      id: 'F932FB',
      name: 'Deseja adicionar Brownie?',
      min: 0,
      max: 1,
      garnishItems: [
        {
          id: 'ee7119ec-6948-4316-a71c-dde6cba2f650',
          name: 'Bk Brownie Brigadeiro',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 9.9,
        },
        {
          id: 'd36cfd42-295a-4b52-a76b-09d31389aa08',
          name: 'Não, Obrigado!',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
      ],
    },
  ],
};

export const useProductStore = defineStore('product', () => {
  /* state */
  const product = reactive(productFixture);

  /* getters */

  /* actions */

  return {
    /* state */
    product,

    /* getters */

    /* actions */
  };
});
