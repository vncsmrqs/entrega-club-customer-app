import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { generateId } from '@/utils';

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
  id: generateId(),
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
      id: generateId(),
      name: 'Escolha seus sanduíches:',
      min: 2,
      max: 2,
      garnishItems: [
        {
          id: generateId(),
          name: 'Chicken Duplo',
          description:
            '2 frangos crocantes, queijo derretido, salada fresca (alface) e maionese Bk.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: generateId(),
          name: 'Rodeio Duplo',
          description:
            'Um hambúrguer de carne bovina grelhada de 57g, pão com gergelim, queijo derretido, onion rings, molho barbecue e maionese bk.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 1,
        },
        {
          id: generateId(),
          name: 'Whopper',
          description:
            'Um hambúrguer com uma carne bovina grelhada de 113g, pão com gergelim, queijo derretido, picles, salada fresca (alface, cebola, tomate), ketchup e maionese bk.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 2,
        },
        {
          id: generateId(),
          name: 'Stacker Duplo',
          description:
            'Um hambúrguer com duas carnes bovinas grelhadas de 57g, pão com gergelim, queijo derretido, fatias de bacon crocante e o exclusivo molho bk stacker.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 2,
        },
        {
          id: generateId(),
          name: 'Chicken Crispy',
          description:
            'Pão de brioche, um delicioso e suculento filé de peito de frango crocante, maionese e alface.',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 2,
        },
        {
          id: generateId(),
          name: 'Cheeseburger Duplo',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
      ],
    },
    {
      id: generateId(),
      name: 'Escolha o acompanhamento:',
      min: 1,
      max: 1,
      garnishItems: [
        {
          id: generateId(),
          name: 'Batata Média',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
      ],
    },
    {
      id: generateId(),
      name: 'Escolha sua Bebida',
      min: 1,
      max: 1,
      garnishItems: [
        {
          id: generateId(),
          name: 'Pepsi Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: generateId(),
          name: 'Pepsi Black Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: generateId(),
          name: 'Guaraná Antarctica Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: generateId(),
          name: 'Guaraná Antarctica Zero Lata - 350 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
        {
          id: generateId(),
          name: 'H2oh Limão - 500 Ml',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 1,
        },
      ],
    },
    {
      id: generateId(),
      name: 'Deseja incrementar seu pedido?',
      min: 1,
      max: 1,
      garnishItems: [
        {
          id: generateId(),
          name: 'Rodeio',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: generateId(),
          name: 'Cheeseburger',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: generateId(),
          name: 'Chicken jr',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: generateId(),
          name: 'Cheddar Jr',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 10.9,
        },
        {
          id: generateId(),
          name: 'Não, Obrigado!',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 0,
        },
      ],
    },
    {
      id: generateId(),
      name: 'Deseja adicionar Brownie?',
      min: 0,
      max: 1,
      garnishItems: [
        {
          id: generateId(),
          name: 'Bk Brownie Brigadeiro',
          // imageUrl: '/image-maskable-192x192.png',
          unitPrice: 9.9,
        },
        {
          id: generateId(),
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
