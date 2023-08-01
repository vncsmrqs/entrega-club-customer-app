import { ref } from 'vue';
import { defineStore } from 'pinia';
import { timeout } from '@/utils';

export type Home = {
  sections: {
    id: string;
    cards: {
      id: string;
      type: string; // SMALL_BANNER_CAROUSEL BIG_BANNER_CAROUSEL MERCHANT_CAROUSEL
      header?: {
        title: string; // 'Mercados próximo a você';
        action: string; // 'page?identifier=e3410e89-f2d4-42f8-8507-7d5dd69a5b0f&title=Mercados+famosos+no+iFood';
      };
      data: {
        id: string; // '7a798f9e-18ae-4259-9f42-e74413db4a1d';
        action: string; //'home-tab?category=RESTAURANT&page_fallback=d0c182b0-5771-4359-b99d-91fd6ef37846';
        imageUrl: string; // ':resolution/discoveries/Restaurantes3_JO1o.png';
        contentDescription: string;
        title: string; //'Restaurantes';
      }[];
    }[];
  }[];
  sectionIfood: [
    {
      id: '8d3632fb-fa08-4ff0-90ab-8705fb3973a8';
      cards: [
        {
          id: '89195eff-0510-4b2c-aafc-edc27fe48229';
          cardType: 'SMALL_BANNER_CAROUSEL';
          data: {
            contents: [
              {
                action: 'home-tab?category=RESTAURANT&page_fallback=d0c182b0-5771-4359-b99d-91fd6ef37846';
                id: '7a798f9e-18ae-4259-9f42-e74413db4a1d';
                imageUrl: ':resolution/discoveries/Restaurantes3_JO1o.png';
                title: 'Restaurantes';
              },
              {
                action: 'home-tab?category=GROCERIES&page_fallback=99a72b3f-0997-419e-8172-b8801914d5e6';
                id: 'c4a77ca0-f9d6-4b90-ab04-5d105fc5abd9';
                imageUrl: ':resolution/discoveries/Mercados_nlXp.png';
                title: 'Mercado';
              },
              {
                action: 'home-tab?category=DRUGSTORE&page_fallback=23c26f7a-71f2-4e4e-a9b1-38c81717cdf7';
                id: 'd5f8b4c7-3936-49d3-a7a1-e9e8bfc585b9';
                imageUrl: ':resolution/discoveries/Farmacia_Nosz.png';
                title: 'Farmácia';
              },
              {
                action: 'home-tab?category=PETSTORE&page_fallback=32705d4e-cfa2-40b2-bb22-d180bac48247';
                id: '03eb6c55-a217-4f6b-aed3-44765d293a1c';
                imageUrl: ':resolution/discoveries/Pet_e9dU.png';
                title: 'Pet';
              },
              {
                action: 'page?identifier=039cf9ca-db99-4a4d-bb2b-fe55b4380e31&title=Express';
                id: 'be229cd9-bd89-499b-8f37-55e29253593e';
                imageUrl: ':resolution/discoveries/Expressgrid1_8jHT.png';
                title: 'Express';
              },
              {
                action: 'home-tab?category=LIQUORSTORE&page_fallback=87d5e5fc-0ced-4686-bfb5-5499f65aafae';
                id: '49d8ba95-dcd9-448a-bd64-d2668b2b876a';
                imageUrl: ':resolution/discoveries/Bebidas_x2Lk.png';
                title: 'Bebidas';
              },
              {
                action: 'home-tab?category=SHOPPING&page_fallback=066119e8-5424-42de-a58b-f405b672523b';
                id: '80b420b3-92ec-4edd-93d7-b6d04218acbb';
                imageUrl: ':resolution/discoveries/floreseperfume_zTRv.png';
                title: 'Shopping';
              },
              {
                action: 'page?identifier=1dd45663-0318-44a2-98bd-951d38ba98e8&title=Gourmet';
                id: '249bb323-8d7c-4412-aebd-0791dff95c4a';
                imageUrl: ':resolution/discoveries/Gourmet_RQ4A.png';
                title: 'Gourmet';
              },
            ];
          };
          discardedSegments: null;
        },
        {
          id: '7858f78c-6a72-4aeb-bc21-4065e7f6d454';
          cardType: 'BIG_BANNER_CAROUSEL';
          data: {
            contents: [
              {
                action: 'page?identifier=487caf15-ff66-4a91-8c2a-9138fe5bb606&title=Taxa%20na%20Faixa';
                contentDescription: 'Taxa na Faixa';
                id: 'e462e9b8-bf8d-4dc9-afa6-5b3b3a0d7d41';
                imageUrl: ':resolution/discoveries/1306PromotionsCampanhasSeloPIJCampanhasAlwaysOnrestaurantesegprincipal_icmH.png';
              },
              {
                action: 'page?identifier=37bc0904-5017-4cb2-b8b5-72bb25640761&title=Festa%20Junina';
                contentDescription: 'Festa Junina';
                id: 'ca55a1d2-3fcb-400a-9a1d-06a3583657a2';
                imageUrl: ':resolution/discoveries/1306PromotionsCampanhasSeloPIJCampanhasAlwaysOnSJprincipal_cQLa.png';
              },
              {
                action: 'page?identifier=e1d7143b-5307-465e-8465-65dab6522368&title=Quem%20quer%20cupom?';
                contentDescription: 'Restaurantes com cupom';
                id: 'bbf76905-7c88-40b3-a7c9-ad1183adf95e';
                imageUrl: ':resolution/discoveries/CapaPrincipalGenericoPedeiFoodJaRoxo_kpHr.png';
              },
              {
                action: 'page?identifier=066119e8-5424-42de-a58b-f405b672523b&title=Shopping';
                contentDescription: 'Shopping';
                id: '81c79196-a5e8-4fde-9412-f82ce37264e5';
                imageUrl: ':resolution/discoveries/02shoppingmulherv1principal2_bgJp.png';
              },
              {
                action: 'webmiddleware?page=https%3A%2F%2Fwebmiddleware.ifood.com.br%2Fnotifications%2Fifood-card-conheca';
                contentDescription: 'iFood Card';
                id: '15a029bb-51f6-4c23-9e67-338dbad81f94';
                imageUrl: ':resolution/discoveries/02ArraiaVermelhoCapaPrincipal016_jlK2.png';
              },
              {
                action: 'page?identifier=cc9846d5-9a38-487d-86fb-fae35f5b439f&title=Essenciais%20da%20Limpeza%20e%20Higiene';
                contentDescription: 'Essenciais da Limpeza';
                id: '665335e8-71fa-48dd-ae88-6ab1f1033acb';
                imageUrl: ':resolution/discoveries/05AdsPromoiFoodBannersInappEssenciaisPrincipal032_3ucm.png';
              },
            ];
          };
          discardedSegments: [
            {
              segmentId: '7858f78c-6a72-4aeb-bc21-4065e7f6d454';
              contentId: '6f3a83cf-fe66-42bd-a2d5-217bab1378e6';
              contentName: 'Doações';
              noContentReason: {
                reason: 'RequestReturnedEmpty';
                system: 'Always On (puppet-cooker)';
              };
            },
            {
              segmentId: '7858f78c-6a72-4aeb-bc21-4065e7f6d454';
              contentId: 'e06274c4-a212-4f1a-865a-f0107d1eccf2';
              contentName: 'Entrega Grátis';
              noContentReason: {
                reason: 'RequestReturnedEmpty';
                additionalInfo: 'Received no results from content-search';
                system: 'cs-collection-v2-counting';
              };
            },
            {
              segmentId: '7858f78c-6a72-4aeb-bc21-4065e7f6d454';
              contentId: '98698b75-55e2-4efc-b82a-08373a30225d';
              contentName: 'Aproveite a entrega grátis';
              noContentReason: {
                reason: 'RequestReturnedEmpty';
                additionalInfo: 'Received no results from content-search';
                system: 'cs-collection-v2-counting';
              };
            },
            {
              segmentId: '7858f78c-6a72-4aeb-bc21-4065e7f6d454';
              contentId: 'e27803da-7643-44ac-b33a-a0615c4552f0';
              contentName: 'Melhores Ofertas';
              noContentReason: {
                reason: 'RequestReturnedEmpty';
                additionalInfo: 'Received no results from content-search';
                system: 'cs-collection-v2-counting';
              };
            },
          ];
        },
        {
          id: '245ead62-2221-48ac-bc2d-9f0824f3ba59';
          cardType: 'MERCHANT_CAROUSEL';
          data: {
            contents: [
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=386b7b09-7733-4b3a-af70-11ca6c2570da&latitude=-18.9146624&longitude=-48.2132162&name=Express%7Centrega%20R%C3%A1pida%20%7C%20Uberl%C3%A2ndia&size=10&slug=uberlandia-mg%2Fexpressentrega-rapida--uberlandia-santa-monica';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 899;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 62;
                deliveryTimeMaxMinutes: 72;
                distance: 4.28;
                id: '386b7b09-7733-4b3a-af70-11ca6c2570da';
                imageUrl: ':resolution/logosgde/386b7b09-7733-4b3a-af70-11ca6c2570da/202207120830_sMMK_l.png';
                mainCategory: 'Mercado';
                name: 'Express|entrega Rápida | Uberlândia';
                userRating: 4.71;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T15:00:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T17:00:00.999-03:00';
                isFavorite: false;
              },
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=11ca0abc-0e10-42e7-9796-b395176d903a&latitude=-18.9146624&longitude=-48.2132162&name=Big%20by%20Carrefour%20Uberlandia&size=10&slug=uberlandia-mg%2Fbig-by-carrefour-uberlandia-santa-monica';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 1648;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 138;
                deliveryTimeMaxMinutes: 153;
                distance: 4.74;
                id: '11ca0abc-0e10-42e7-9796-b395176d903a';
                imageUrl: ':resolution/logosgde/11ca0abc-0e10-42e7-9796-b395176d903a/202305080912_rWWZ_i.jpg';
                mainCategory: 'Mercado';
                name: 'Big by Carrefour Uberlandia';
                userRating: 4.21;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T15:00:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T16:00:00.999-03:00';
                isFavorite: false;
              },
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=a3c2083f-8f9d-4857-b010-8bbe020150f3&latitude=-18.9146624&longitude=-48.2132162&name=Carrefour%20Hiper%20-%20Uberl%C3%A2ndia&size=10&slug=uberlandia-mg%2Fcarrefour-hiper---uberlandia-santa-monica';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 1648;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 108;
                deliveryTimeMaxMinutes: 123;
                distance: 4.94;
                id: 'a3c2083f-8f9d-4857-b010-8bbe020150f3';
                imageUrl: ':resolution/logosgde/a3c2083f-8f9d-4857-b010-8bbe020150f3/202202161000_HuJt_i.png';
                mainCategory: 'Mercado';
                name: 'Carrefour Hiper - Uberlândia';
                userRating: 4.39;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTakeout: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T15:00:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T16:00:00.999-03:00';
                isFavorite: false;
              },
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=532fbb0e-0d49-4556-bd67-9604cc01120e&latitude=-18.9146624&longitude=-48.2132162&name=Hiper%20ABC%20Uberl%C3%A2ndia-%20LOJA%2045&size=10&slug=uberlandia-mg%2Fhiper-abc-uberlandia--loja-45-centro';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 1848;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 144;
                deliveryTimeMaxMinutes: 159;
                distance: 6.02;
                id: '532fbb0e-0d49-4556-bd67-9604cc01120e';
                imageUrl: ':resolution/logosgde/532fbb0e-0d49-4556-bd67-9604cc01120e/202303100931_t7YK_i.jpg';
                mainCategory: 'Mercado';
                name: 'Hiper ABC Uberlândia- LOJA 45';
                userRating: 4.56;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTakeout: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T15:00:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T16:00:00.999-03:00';
                isFavorite: false;
              },
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=b8a217c3-6b3a-463c-b88a-c851e14e9387&latitude=-18.9146624&longitude=-48.2132162&name=Bretas%20-%20Rondon%20Pacheco&size=10&slug=uberlandia-mg%2Fbretas---rondon-pacheco-virgilato-pereira';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 1898;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 116;
                deliveryTimeMaxMinutes: 131;
                distance: 6.92;
                id: 'b8a217c3-6b3a-463c-b88a-c851e14e9387';
                imageUrl: ':resolution/logosgde/b8a217c3-6b3a-463c-b88a-c851e14e9387/202305160924_9uPs_i.jpg';
                mainCategory: 'Mercado';
                name: 'Bretas - Rondon Pacheco';
                userRating: 4.31;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T15:00:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T16:00:00.999-03:00';
                isFavorite: false;
              },
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=c7245c7c-89f7-48cb-a81d-a397e1448a53&latitude=-18.9146624&longitude=-48.2132162&name=Atacad%C3%A3o%20Uberl%C3%A2ndia&size=10&slug=uberlandia-mg%2Fatacadao-uberlandia-presidente-roosevelt';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 1948;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 118;
                deliveryTimeMaxMinutes: 133;
                distance: 7.03;
                id: 'c7245c7c-89f7-48cb-a81d-a397e1448a53';
                imageUrl: ':resolution/logosgde/c7245c7c-89f7-48cb-a81d-a397e1448a53/202303131533_hGI8_i.jpg';
                mainCategory: 'Mercado';
                name: 'Atacadão Uberlândia';
                userRating: 4.67;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T15:00:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T16:00:00.999-03:00';
                isFavorite: false;
              },
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=bff08e8d-b3e4-45a4-a9f6-4722dc328967&latitude=-18.9146624&longitude=-48.2132162&name=P%C3%A3o%20de%20A%C3%A7%C3%BAcar%20-%20Uberl%C3%A2ndia&size=10&slug=uberlandia-mg%2Fpao-de-acucar---uberlandia-morada-da-colina';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 1948;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 118;
                deliveryTimeMaxMinutes: 133;
                distance: 7.1;
                id: 'bff08e8d-b3e4-45a4-a9f6-4722dc328967';
                imageUrl: ':resolution/logosgde/bff08e8d-b3e4-45a4-a9f6-4722dc328967/202105171519_L80w_i.png';
                mainCategory: 'Mercado';
                name: 'Pão de Açúcar - Uberlândia';
                userRating: 4.55;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTakeout: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T14:30:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T16:30:00.999-03:00';
                isFavorite: false;
              },
              {
                action: 'groceries?alias=HOME_MULTICATEGORY&channel=IFOOD&id=cea95ed6-3d03-4761-8708-ee1609893ebb&identifier=92045cdc-bf99-49d0-a59d-18340eb327f2&latitude=-18.9146624&longitude=-48.2132162&name=Extra%20-%20Uberlandia&size=10&slug=uberlandia-mg%2Fextra---uberlandia-morada-da-colina';
                available: true;
                availableForScheduling: true;
                currency: 'BRL';
                deliveryFee: 1948;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 118;
                deliveryTimeMaxMinutes: 133;
                distance: 7.1;
                id: '92045cdc-bf99-49d0-a59d-18340eb327f2';
                imageUrl: ':resolution/logosgde/92045cdc-bf99-49d0-a59d-18340eb327f2/202207260857_qLI7_i.jpg';
                mainCategory: 'Mercado';
                name: 'Extra - Uberlandia';
                userRating: 4.24;
                isIfoodDelivery: true;
                supportsDelivery: true;
                supportsScheduling: true;
                supportsTracking: true;
                nextSchedulingSlotStartTime: '2023-08-01T16:00:00.000-03:00';
                nextSchedulingSlotEndTime: '2023-08-01T18:00:00.999-03:00';
                isFavorite: false;
              },
            ];
            rowLimit: 2;
            header: {
              title: 'Mercados próximo a você';
              action: 'page?identifier=e3410e89-f2d4-42f8-8507-7d5dd69a5b0f&title=Mercados+famosos+no+iFood';
            };
          };
          discardedSegments: null;
        },
        {
          id: '390a5911-74c5-48e4-b804-653d5e1b6d14';
          cardType: 'CATALOG_ITEM_CAROUSEL';
          data: {
            contentDescription: 'Bom e Barato';
            contents: [
              {
                id: '660f57ed-e8a5-463c-8c51-8e39378b15bd';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=660f57ed-e8a5-463c-8c51-8e39378b15bd&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Bife e Fritas';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202210182129_7WYD_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 1990;
                  originalUnitPrice: 3000;
                };
                givesFreeDelivery: false;
              },
              {
                id: '0132376f-d8e7-49d0-9fde-7e67d9759bb9';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=0132376f-d8e7-49d0-9fde-7e67d9759bb9&merchantUuid=16bbd8b4-6e62-43ec-be45-0d8520cb890c';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Strogonoff de Frango';
                itemImageUrl: ':resolution/pratos/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202306061932_r22U_.jpeg';
                merchantImageUrl: ':resolution/logosgde/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202209261659_8JKs_i.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 2490;
                  originalUnitPrice: 3490;
                };
                givesFreeDelivery: false;
              },
              {
                id: '6f4a628b-9a39-4b03-8305-8757e91c752e';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=6f4a628b-9a39-4b03-8305-8757e91c752e&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Carne assada Baby + suco de natural';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202210182132_3UG5_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 2290;
                };
                givesFreeDelivery: false;
              },
              {
                id: '225064cc-0725-4f71-ab9b-91e3c99f70a2';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=225064cc-0725-4f71-ab9b-91e3c99f70a2&merchantUuid=16bbd8b4-6e62-43ec-be45-0d8520cb890c';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Parmegiana de Filé de Frango';
                itemImageUrl: ':resolution/pratos/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202306061932_PDps_.jpeg';
                merchantImageUrl: ':resolution/logosgde/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202209261659_8JKs_i.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 2490;
                  originalUnitPrice: 3490;
                };
                givesFreeDelivery: false;
              },
              {
                id: '1c294608-323a-4ea9-9b09-5b100326acd2';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=1c294608-323a-4ea9-9b09-5b100326acd2&merchantUuid=f9923459-0df4-409a-90b0-d4210491f63f';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 35;
                deliveryTimeMaxMinutes: 45;
                name: 'Marmitex com 2 carnes';
                itemImageUrl: ':resolution/pratos/f9923459-0df4-409a-90b0-d4210491f63f/202304191432_H135_i.jpg';
                merchantImageUrl: ':resolution/logosgde/f9923459-0df4-409a-90b0-d4210491f63f/201904262118_8Zix_l.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 2450;
                  originalUnitPrice: 2650;
                };
                givesFreeDelivery: false;
              },
              {
                id: '216e55cf-44d1-4b1d-a1e2-109b52bbdc6f';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=216e55cf-44d1-4b1d-a1e2-109b52bbdc6f&merchantUuid=16bbd8b4-6e62-43ec-be45-0d8520cb890c';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Feijoada';
                itemImageUrl: ':resolution/pratos/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202210241704_MPO3_i.jpg';
                merchantImageUrl: ':resolution/logosgde/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202209261659_8JKs_i.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 2490;
                  originalUnitPrice: 3490;
                };
                givesFreeDelivery: false;
              },
              {
                id: '7a57dfa2-1e95-46da-8924-0ab3e9665160';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=7a57dfa2-1e95-46da-8924-0ab3e9665160&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Carne Assada';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202210182132_3UG5_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 2499;
                };
                givesFreeDelivery: false;
              },
              {
                id: '4be5f8cc-69dd-4762-944c-29f97617c668';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=4be5f8cc-69dd-4762-944c-29f97617c668&merchantUuid=16bbd8b4-6e62-43ec-be45-0d8520cb890c';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Lasanha Presunto e Mussarela';
                itemImageUrl: ':resolution/pratos/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202306061933_woVv_.jpeg';
                merchantImageUrl: ':resolution/logosgde/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202209261659_8JKs_i.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 2490;
                  originalUnitPrice: 3490;
                };
                givesFreeDelivery: false;
              },
              {
                id: 'e6ad514e-2a49-49e4-b2b0-2065f96d9e8f';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=e6ad514e-2a49-49e4-b2b0-2065f96d9e8f&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Strogonoff e fritas baby + Suco de Laranja';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202212032143_78U7_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 2290;
                };
                givesFreeDelivery: false;
              },
              {
                id: 'da107c69-ce72-423f-9764-75b2ca3c2be1';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=da107c69-ce72-423f-9764-75b2ca3c2be1&merchantUuid=f9923459-0df4-409a-90b0-d4210491f63f';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 35;
                deliveryTimeMaxMinutes: 45;
                name: 'Marmitex medio com 1 carne';
                itemImageUrl: ':resolution/pratos/f9923459-0df4-409a-90b0-d4210491f63f/202304191545_P7J7_i.jpg';
                merchantImageUrl: ':resolution/logosgde/f9923459-0df4-409a-90b0-d4210491f63f/201904262118_8Zix_l.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 2090;
                  originalUnitPrice: 2290;
                };
                givesFreeDelivery: false;
              },
              {
                id: 'd036464e-43ba-40c5-8861-b724bf25812f';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=d036464e-43ba-40c5-8861-b724bf25812f&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Carne Assada Baby + Refri 200';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202210182132_3UG5_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 1990;
                };
                givesFreeDelivery: false;
              },
              {
                id: '367d984a-5530-442d-9c05-de7cd9b8876b';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=367d984a-5530-442d-9c05-de7cd9b8876b&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Strogonoff de Frango e fritas';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202212032143_78U7_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 2290;
                };
                givesFreeDelivery: false;
              },
              {
                id: '92d6db56-0b99-4f7e-bcb2-39ed7063665c';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=92d6db56-0b99-4f7e-bcb2-39ed7063665c&merchantUuid=be742be5-e70e-4f08-988f-b80384af071c';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Marmita de Frango ou Bife Bovino Acebolado';
                itemImageUrl: ':resolution/pratos/be742be5-e70e-4f08-988f-b80384af071c/202304172114_8SC4_i.jpg';
                merchantImageUrl: ':resolution/logosgde/201807301057_be742be5-e70e-4f08-988f-b80384af071c.png';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 1999;
                };
                givesFreeDelivery: false;
              },
              {
                id: 'fa759772-154e-4f76-97b3-e7f17d9a2e72';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=fa759772-154e-4f76-97b3-e7f17d9a2e72&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Linguiça Assada Baby + refri 200';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301021857_0451_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 1990;
                };
                givesFreeDelivery: false;
              },
              {
                id: '488bdab8-b965-430b-81e2-536e4200126a';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=488bdab8-b965-430b-81e2-536e4200126a&merchantUuid=b68260d0-868f-4eeb-a429-81e0b8944bcb';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Super Frango';
                itemImageUrl: ':resolution/pratos/b68260d0-868f-4eeb-a429-81e0b8944bcb/202207111851_GGSE_i.jpg';
                merchantImageUrl: ':resolution/logosgde/b68260d0-868f-4eeb-a429-81e0b8944bcb/202112102241_fbJC_.jpeg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 1990;
                  originalUnitPrice: 2490;
                };
                givesFreeDelivery: false;
              },
              {
                id: '5f033fe1-749a-4865-a824-3593d730d718';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=5f033fe1-749a-4865-a824-3593d730d718&merchantUuid=9b0531e1-6c02-4bd5-ad50-0657c7bacf87';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 35;
                deliveryTimeMaxMinutes: 45;
                name: 'Marmitex com 1 carne';
                itemImageUrl: ':resolution/pratos/9b0531e1-6c02-4bd5-ad50-0657c7bacf87/202210182149_O5JM_i.jpg';
                merchantImageUrl: ':resolution/logosgde/9b0531e1-6c02-4bd5-ad50-0657c7bacf87/202210131109_Oijw_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 1690;
                };
                givesFreeDelivery: false;
              },
              {
                id: '627a0626-a0c7-47be-ad5c-41568a234d43';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=627a0626-a0c7-47be-ad5c-41568a234d43&merchantUuid=b68260d0-868f-4eeb-a429-81e0b8944bcb';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Super Calabresa';
                itemImageUrl: ':resolution/pratos/b68260d0-868f-4eeb-a429-81e0b8944bcb/202212122115_FB6C_i.jpg';
                merchantImageUrl: ':resolution/logosgde/b68260d0-868f-4eeb-a429-81e0b8944bcb/202112102241_fbJC_.jpeg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 1990;
                  originalUnitPrice: 2490;
                };
                givesFreeDelivery: false;
              },
              {
                id: '641a0d75-b25c-412c-b3de-ac758b607fee';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=641a0d75-b25c-412c-b3de-ac758b607fee&merchantUuid=16bbd8b4-6e62-43ec-be45-0d8520cb890c';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Super Promo Ovo Frito e Frango';
                itemImageUrl: ':resolution/pratos/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202302021910_WQ33_i.jpg';
                merchantImageUrl: ':resolution/logosgde/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202209261659_8JKs_i.jpg';
                pricing: {
                  type: 'PROMOTIONAL';
                  unitPrice: 1990;
                  originalUnitPrice: 2690;
                };
                givesFreeDelivery: false;
              },
              {
                id: '308f8b81-14ab-4ebf-8867-71dc6ac5d489';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=308f8b81-14ab-4ebf-8867-71dc6ac5d489&merchantUuid=0bf2303a-9c85-4e7d-9cc3-01182e074a64';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 50;
                deliveryTimeMaxMinutes: 60;
                name: 'Picadinho de carne ao molho';
                itemImageUrl: ':resolution/pratos/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202304010927_S032_i.jpg';
                merchantImageUrl: ':resolution/logosgde/0bf2303a-9c85-4e7d-9cc3-01182e074a64/202301022040_DZkb_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 2290;
                };
                givesFreeDelivery: false;
              },
              {
                id: '6688dcb1-1ac8-469c-999e-6e18d9b41dd0';
                available: true;
                availableForScheduling: false;
                action: 'catalog-item?itemUuid=6688dcb1-1ac8-469c-999e-6e18d9b41dd0&merchantUuid=ae419d8f-ffe9-492e-a8d5-864061be0001';
                currency: 'BRL';
                deliveryFee: 0;
                deliveryFeeType: 'FIXED';
                deliveryTimeMinMinutes: 45;
                deliveryTimeMaxMinutes: 55;
                name: 'Marmitex de Calabresa Acebolada';
                itemImageUrl: ':resolution/pratos/ae419d8f-ffe9-492e-a8d5-864061be0001/202305271502_UAR4_i.jpg';
                merchantImageUrl: ':resolution/logosgde/ae419d8f-ffe9-492e-a8d5-864061be0001/202305102219_cvhK_i.jpg';
                pricing: {
                  type: 'REGULAR';
                  unitPrice: 2300;
                };
                givesFreeDelivery: false;
              },
            ];
            header: {
              title: 'Bom e Barato';
              action: 'page?identifier=56434d79-a769-4e4b-b621-432872a04150&title=Bom+e+Barato';
              description: 'Opções até R$25 sem taxa de entrega.';
            };
          };
          discardedSegments: null;
        },
        {
          id: '10a8555c-2f1f-4749-9559-10df837a5326';
          cardType: 'SMALL_BANNER_CAROUSEL';
          data: {
            contentDescription: 'Mais iFood pra você';
            contents: [
              {
                action: 'webmiddleware?page=https%3A%2F%2Fwebmiddleware.ifood.com.br%2Fmarketplace%2Fclub%3Fref%3Dhome_produtos';
                id: '96ffc923-e8c4-41bc-b49a-d4101ed3927e';
                imageUrl: ':resolution/discoveries/iconeclubev10_B6Om.png';
                title: 'Clube iFood';
              },
              {
                action: 'webmiddleware?page=https%3A%2F%2Fwebmiddleware.ifood.com.br%2Fnotifications%2Fifood-card-conheca';
                id: '3cc0edaf-47a4-4fd4-9982-c92b4d1aa6df';
                imageUrl: ':resolution/discoveries/02ifoodcard_W0Gj.png';
                title: 'iFood Card';
              },
              {
                action: 'page?identifier=e1d7143b-5307-465e-8465-65dab6522368&title=Cupons';
                id: '433aa443-aea7-4244-b654-120ae032234a';
                imageUrl: ':resolution/discoveries/03cupons_ESAv.png';
                title: 'Cupons';
              },
            ];
            header: {
              title: 'Mais iFood pra você';
              description: '';
            };
          };
          discardedSegments: [
            {
              segmentId: '10a8555c-2f1f-4749-9559-10df837a5326';
              contentId: 'c06bd525-a650-4d78-9b16-02a2f4bfba6d';
              contentName: 'Doações';
              noContentReason: {
                reason: 'RequestReturnedEmpty';
                system: 'Always On (puppet-cooker)';
              };
            },
            {
              segmentId: '10a8555c-2f1f-4749-9559-10df837a5326';
              contentId: 'b667d28a-3d5a-442c-96b2-a8681649990c';
              contentName: 'Feed';
              noContentReason: {
                reason: 'RequestReturnedEmpty';
                system: 'Always On (puppet-cooker)';
              };
            },
          ];
        },
        {
          id: '5828956d-0434-4b0b-8c70-dac175521605';
          cardType: 'ROUND_IMAGE_CAROUSEL';
          data: {
            contents: [
              {
                id: '800df102-e34d-48a2-8882-06fc5de807fc';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=800df102-e34d-48a2-8882-06fc5de807fc&latitude=-18.9146624&longitude=-48.2132162&name=Coco%20Bambu%20Uberl%C3%A2ndia&size=10&slug=uberlandia-mg%2Fcoco-bambu-uberlandia-tibery';
                imageUrl: ':resolution/logosgde/800df102-e34d-48a2-8882-06fc5de807fc/202104040943_T8xG_i.jpg';
                title: 'Coco Bambu Uberlândia';
              },
              {
                id: '48df75c2-754a-40b9-b8e6-b57ac48c7963';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=48df75c2-754a-40b9-b8e6-b57ac48c7963&latitude=-18.9146624&longitude=-48.2132162&name=Mania%20dos%20Pasteis&size=10&slug=uberlandia-mg%2Fmania-dos-pasteis-centro';
                imageUrl: ':resolution/logosgde/48df75c2-754a-40b9-b8e6-b57ac48c7963/202210282321_Qkwk_i.jpg';
                title: 'Mania dos Pasteis';
              },
              {
                id: '39b06fb9-aafa-4c78-a2ec-f062ca255077';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=39b06fb9-aafa-4c78-a2ec-f062ca255077&latitude=-18.9146624&longitude=-48.2132162&name=Casa%20Bauducco%20-%20Uberl%C3%A2ndia&size=10&slug=uberlandia-mg%2Fcasa-bauducco---uberlandia-tibery';
                imageUrl: ':resolution/logosgde/39b06fb9-aafa-4c78-a2ec-f062ca255077/202302281009_JSTB_i.jpg';
                title: 'Casa Bauducco - Uberlândia';
              },
              {
                id: 'a1be4ada-55e8-47c1-ad7b-a78a591a6e8e';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=a1be4ada-55e8-47c1-ad7b-a78a591a6e8e&latitude=-18.9146624&longitude=-48.2132162&name=Quitanderia%20Gourmet&size=10&slug=uberlandia-mg%2Fquitanderia-gourmet-centro';
                imageUrl: ':resolution/logosgde/a1be4ada-55e8-47c1-ad7b-a78a591a6e8e/202304281640_n88o_i.jpg';
                title: 'Quitanderia Gourmet';
              },
              {
                id: '485cdd5d-a5b1-48c2-b3f3-cb2ec4edd977';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=485cdd5d-a5b1-48c2-b3f3-cb2ec4edd977&latitude=-18.9146624&longitude=-48.2132162&name=Lanchetto%20%28griletto%29%20Uberl%C3%A2ndia%20Shopping&size=10&slug=uberlandia-mg%2Flanchetto-griletto-uberlandia-shopping-gavea';
                imageUrl: ':resolution/logosgde/485cdd5d-a5b1-48c2-b3f3-cb2ec4edd977/202103161034_4wDI_i.jpg';
                title: 'Lanchetto (griletto) Uberlândia Shopping';
              },
              {
                id: '8fdefecc-279e-4ba2-bbb2-73f67bb1d992';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=8fdefecc-279e-4ba2-bbb2-73f67bb1d992&latitude=-18.9146624&longitude=-48.2132162&name=Tijolinho%20Restaurante&size=10&slug=uberlandia-mg%2Ftijolinho-restaurante-nossa-senhora-aparecida';
                imageUrl: ':resolution/logosgde/8fdefecc-279e-4ba2-bbb2-73f67bb1d992/202301310943_nI9E_i.jpg';
                title: 'Tijolinho Restaurante';
              },
              {
                id: '9cc820b6-a424-401a-ab7e-ef39732e06da';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=9cc820b6-a424-401a-ab7e-ef39732e06da&latitude=-18.9146624&longitude=-48.2132162&name=Pronto%20Socorro%20da%20Sede&size=10&slug=uberlandia-mg%2Fpronto-socorro-da-sede-tibery';
                imageUrl: ':resolution/logosgde/9cc820b6-a424-401a-ab7e-ef39732e06da/202304121637_nELp_i.jpg';
                title: 'Pronto Socorro da Sede';
              },
              {
                id: '46e92b87-1b44-4bdd-a344-985c26993c46';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=46e92b87-1b44-4bdd-a344-985c26993c46&latitude=-18.9146624&longitude=-48.2132162&name=Dina%20Restaurante-%20P%C3%A1tio%20Vinhedos&size=10&slug=uberlandia-mg%2Fdina-restaurante--patio-vinhedos-jardim-karaiba';
                imageUrl: ':resolution/logosgde/46e92b87-1b44-4bdd-a344-985c26993c46/202304051211_9Bgk_i.jpg';
                title: 'Dina Restaurante- Pátio Vinhedos';
              },
              {
                id: '2cace795-0266-45b3-9a1f-908475db02b1';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=2cace795-0266-45b3-9a1f-908475db02b1&latitude=-18.9146624&longitude=-48.2132162&name=Punch%20Smash%20Burger%20Patio%20Sabia&size=10&slug=uberlandia-mg%2Fpunch-smash-burger-patio-sabia-tibery';
                imageUrl: ':resolution/logosgde/2cace795-0266-45b3-9a1f-908475db02b1/202204152055_IROD_i.jpg';
                title: 'Punch Smash Burger Patio Sabia';
              },
              {
                id: '891c06d8-8beb-4096-9953-29ee34365583';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&id=9771bbb1-90ea-46cf-8966-7179dfd44e15&identifier=891c06d8-8beb-4096-9953-29ee34365583&latitude=-18.9146624&longitude=-48.2132162&name=Aussie%20Grill%20-%20Center%20Shop.%20Uberl%C3%A2ndia&size=10&slug=uberlandia-mg%2Faussie-grill---center-shop-uberlandia-tibery';
                imageUrl: ':resolution/logosgde/891c06d8-8beb-4096-9953-29ee34365583/202102262121_A8iF_i.jpg';
                title: 'Aussie Grill - Center Shop. Uberlândia';
              },
            ];
            header: {
              title: 'Famosos no iFood';
              action: 'page?identifier=2a9153a4-50f6-4740-b68f-e1fc3b4b58bd&title=Famosos+no+iFood';
            };
          };
          discardedSegments: null;
        },
        {
          id: '5144430c-ea1b-423a-b0e2-ba65a2108734';
          cardType: 'SMALL_BANNER_CAROUSEL';
          data: {
            contents: [
              {
                action: 'page?identifier=99a72b3f-0997-419e-8172-b8801914d5e6&title=Mercado';
                id: '3bdf5e97-de31-4ef9-b1a8-e2ba0bc4aed6';
                imageUrl: ':resolution/discoveries/mercado_4RhE.png';
                title: 'Mercado';
              },
              {
                action: 'page?identifier=b4146511-0b50-484c-b67d-bd79746ecc63&title=BRASILEIRA';
                id: 'c404e717-21e3-4073-bc4b-857d68563383';
                imageUrl: ':resolution/discoveries/brasileira_1XfT.png';
                title: 'Brasileira';
              },
              {
                action: 'page?identifier=53d57edc-7ca3-427a-af80-b1e7b4247703&title=Promocoes';
                id: 'a768f164-bc2a-422e-862c-80eee4faa909';
                imageUrl: ':resolution/discoveries/bagcupones1_eqF1.png';
                title: 'Promoções';
              },
              {
                action: 'page?identifier=16d7f283-cfff-49b6-9616-921fd7af4d8a&title=Lanches';
                id: '335df0c2-ad12-40b2-a4d1-2ca06fddbc23';
                imageUrl: ':resolution/discoveries/lanches_HC15.png';
                title: 'Lanches';
              },
              {
                action: 'page?identifier=f4c3d838-02fc-4d4f-813b-d2d2a1b77f93&title=MARMITA';
                id: 'e5f73f27-86f6-4eee-b36f-37111bf94b05';
                imageUrl: ':resolution/discoveries/Marmita2_LXbQ.png';
                title: 'Marmita';
              },
              {
                action: 'page?identifier=7f43737d-add9-46ab-b916-d26db25c5e3b&title=Doces%20%26%20Bolos';
                id: '55eff436-9c41-4509-a5c1-5b601d1b5c5f';
                imageUrl: ':resolution/discoveries/docesebolos_RfHb.png';
                title: 'Doces & Bolos';
              },
              {
                action: 'page?identifier=dae91778-0405-4e87-a36d-eda0fbe88653&title=Saud%C3%A1vel';
                id: 'ea79b94c-d16c-4067-9ac9-c31a9193384d';
                imageUrl: ':resolution/discoveries/saudaveis_aTKz.png';
                title: 'Saudável';
              },
              {
                action: 'page?identifier=dc934e50-c77e-499a-86b6-702e38877a22&title=Japonesa';
                id: 'cc7487b6-f159-42f1-b294-54908a996eda';
                imageUrl: ':resolution/discoveries/japonesa_FP14.png';
                title: 'Japonesa';
              },
              {
                action: 'page?identifier=f1916d72-78ce-46d4-a379-d527b61bab69&title=Italiana';
                id: '96302acc-be6e-4eba-8378-e2fb16db33ba';
                imageUrl: ':resolution/discoveries/italiana_Y4je.png';
                title: 'Italiana';
              },
              {
                action: 'page?identifier=d5edc55e-b7a4-4c33-a0a1-0f01affb597e&title=A%C3%A7a%C3%AD';
                id: 'a09d71df-8236-43cf-939f-d6f99cbc3d04';
                imageUrl: ':resolution/discoveries/acai_WTXp.png';
                title: 'Açaí';
              },
              {
                action: 'page?identifier=ee850743-062f-4653-ac02-2910e5bb6f50&title=Carnes';
                id: '8a55948f-dd6c-4dd3-ba85-4859801da032';
                imageUrl: ':resolution/discoveries/carnes_T64X.png';
                title: 'Carnes';
              },
              {
                action: 'page?identifier=61565a64-91b1-470f-bd6f-057579c36722&title=Chinesa';
                id: '72210836-3592-4424-a194-0b9413ec7c90';
                imageUrl: ':resolution/discoveries/chinesa_pIpW.png';
                title: 'Chinesa';
              },
              {
                action: 'page?identifier=f518e69f-1f5e-45d8-821f-6dc3016b146c&title=Sorvetes';
                id: 'e7daf067-09b4-440d-8117-2d567853eb7c';
                imageUrl: ':resolution/discoveries/sorvetes_BD8y.png';
                title: 'Sorvetes';
              },
              {
                action: 'page?identifier=088581b1-250f-4b9c-b68d-e99da1c825ab&title=Pizza';
                id: 'c92526cf-f09b-4a55-8375-f7d659dceb80';
                imageUrl: ':resolution/discoveries/pizzas_KxCO.png';
                title: 'Pizza';
              },
              {
                action: 'page?identifier=ecb660db-92ed-423d-99e3-06a66e797a32&title=Padarias';
                id: '34eab051-8033-487a-8d07-77a53f33397b';
                imageUrl: ':resolution/discoveries/padaria_cF7D.png';
                title: 'Padarias';
              },
            ];
          };
          discardedSegments: [
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: 'c1480724-d663-4679-9d1b-2bb795db23a7';
              contentName: 'Gourmet';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: '6e0088e2-58d3-4d4f-8658-54ca6a079b50';
              contentName: 'Salgados';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: '8ccd93cd-8655-4352-9117-2d65584608e1';
              contentName: 'Árabe';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: 'c8b81220-a3b3-4591-9d5c-f3c6c681be7c';
              contentName: 'Pastel';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: '53becec2-e10c-4be7-aa1d-ba9520a7c377';
              contentName: 'Bebidas';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: '0f9206c2-8ca9-474f-9aad-669b849863a2';
              contentName: 'Cafeterias';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: '4c1a2d12-1ada-46f0-afaa-2ca08dc22319';
              contentName: 'Vegetariana';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
            {
              segmentId: '5144430c-ea1b-423a-b0e2-ba65a2108734';
              contentId: 'eb242532-2e4e-4b85-be2e-11f2ecfc608e';
              contentName: 'Conveniência';
              noContentReason: {
                reason: 'NumberOfReturnedContentsAreLessThanTheMinNumber';
                additionalInfo: 'This element had content, but was on a position above 15, with is the max number of entries defined to present this card';
                system: 'counting-cook.cardstack-platform';
              };
            },
          ];
        },
      ];
    },
    {
      id: 'ed703c07-d774-4f05-9bbd-67eeb3b6dc23';
      header: {
        id: 'ed703c07-d774-4f05-9bbd-67eeb3b6dc23';
        headerType: 'OPERATION_HEADER';
        data: {
          isSticky: true;
          operations: [
            {
              type: 'DEFAULT_SORTING';
              sortOptions: [
                'default',
                'price_range',
                'user_rating',
                'delivery_time',
                'delivery_fee',
                'distance',
              ];
              selected: 'default';
            },
            {
              type: 'QUICK_FILTER_DELIVERY_FEE';
              isSelected: false;
            },
            {
              type: 'QUICK_FILTER_ONLINE_VR';
              options: [
                {
                  code: 'IMV';
                  description: 'iFood Refeição';
                  imageUrl: ':resolution/icones/pgto/IMV.png';
                },
                {
                  imageUrl: ':resolution/icones/pgto/VRO.png';
                  code: 'VRO';
                  description: 'VR Refeição';
                },
                {
                  imageUrl: ':resolution/icones/pgto/SRP.png';
                  code: 'SRP';
                  description: 'Sodexo Refeição';
                },
                {
                  code: 'ALR';
                  description: 'Alelo Refeição';
                  imageUrl: ':resolution/icones/pgto/ALR.png';
                },
                {
                  code: 'TRO';
                  description: 'Ticket Restaurante';
                  imageUrl: ':resolution/icones/pgto/TRO.png';
                },
                {
                  imageUrl: ':resolution/icones/pgto/BENRON.png';
                  code: 'BENRON';
                  description: 'Ben Refeição';
                },
              ];
              selected: [];
            },
            {
              type: 'DISTANCE_FILTER';
              distanceFrom: 1;
              distanceTo: 100;
            },
            {
              type: 'QUICK_FILTER_IFOOD_DELIVERY';
              isSelected: false;
            },
            {
              type: 'QUICK_FILTER_SUPER_RESTAURANT';
              isSelected: false;
            },
            {
              type: 'QUICK_FILTER_TAKEOUT';
              isSelected: false;
            },
            {
              type: 'COMPLEX_LEGACY_FILTER';
              appliedCount: 0;
            },
          ];
        };
      };
      cards: [
        {
          id: '82551605-ae0b-4913-89ce-cee36e6431e6';
          cardType: 'MERCHANT_LIST_V2';
          data: {
            contents: [
              {
                id: '3ac74981-d56b-441b-b8ad-18831a1a8131';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=3ac74981-d56b-441b-b8ad-18831a1a8131&latitude=-18.9146624&longitude=-48.2132162&name=Mcdonald%27s%20%20-%20Santa%20Monica%20Shop%20%28ub3%29&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fmcdonalds----santa-monica-shop-ub3-tibery&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 1299;
                  timeMinMinutes: 33;
                  timeMaxMinutes: 43;
                  deliveryMode: 'DEFAULT';
                };
                distance: 5;
                imageUrl: ':resolution/logosgde/201909101959_3ac74981-d56b-441b-b8ad-18831a1a8131.jpg';
                isIfoodDelivery: true;
                isNew: false;
                isSuperRestaurant: true;
                mainCategory: 'Lanches';
                name: "Mcdonald's  - Santa Monica Shop (ub3)";
                supportsTracking: true;
                userRating: 4.75;
                isFavorite: false;
              },
              {
                id: '16bbd8b4-6e62-43ec-be45-0d8520cb890c';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=16bbd8b4-6e62-43ec-be45-0d8520cb890c&latitude=-18.9146624&longitude=-48.2132162&name=O%20Rei%20dos%20Pratos%20-%20Santa%20M%C3%B4nica&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fo-rei-dos-pratos---santa-monica-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 50;
                  timeMaxMinutes: 60;
                  deliveryMode: 'DEFAULT';
                };
                distance: 2.49;
                imageUrl: ':resolution/logosgde/16bbd8b4-6e62-43ec-be45-0d8520cb890c/202209261659_8JKs_i.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Brasileira';
                name: 'O Rei dos Pratos - Santa Mônica';
                supportsTracking: false;
                userRating: 4.409999847412109;
                isFavorite: false;
              },
              {
                id: 'cbd42629-38d3-485e-a850-24e2c4fbb3cc';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=cbd42629-38d3-485e-a850-24e2c4fbb3cc&latitude=-18.9146624&longitude=-48.2132162&name=Essencial%20P%C3%A3es%20%26%20Pizzaria%20Alto%20Umuarama&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fessencial-paes--pizzaria-alto-umuarama-custodio-pereira&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 400;
                  timeMinMinutes: 50;
                  timeMaxMinutes: 60;
                  deliveryMode: 'DEFAULT';
                };
                distance: 3.66;
                imageUrl: ':resolution/logosgde/cbd42629-38d3-485e-a850-24e2c4fbb3cc/202103041914_xGr9_i.png';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Padaria';
                name: 'Essencial Pães & Pizzaria Alto Umuarama';
                supportsTracking: false;
                userRating: 4.199999809265137;
                isFavorite: false;
              },
              {
                id: '6b079541-2855-4016-bc0f-ccc436068aed';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=6b079541-2855-4016-bc0f-ccc436068aed&latitude=-18.9146624&longitude=-48.2132162&name=A%20Pizza%20das%20Gal%C3%A1xias&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fa-pizza-das-galaxias-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 60;
                  timeMaxMinutes: 70;
                  deliveryMode: 'DEFAULT';
                };
                distance: 4.14;
                imageUrl: ':resolution/logosgde/6b079541-2855-4016-bc0f-ccc436068aed/202209172045_kX3j_i.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Pizza';
                name: 'A Pizza das Galáxias';
                supportsTracking: false;
                userRating: 4.360000133514404;
                isFavorite: false;
              },
              {
                id: '626ac523-b259-4108-b8a5-0d9531c66e95';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=626ac523-b259-4108-b8a5-0d9531c66e95&latitude=-18.9146624&longitude=-48.2132162&name=Barolo%20Restaurante&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fbarolo-restaurante-tibery&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 1199;
                  timeMinMinutes: 74;
                  timeMaxMinutes: 84;
                  deliveryMode: 'DEFAULT';
                };
                distance: 5;
                imageUrl: ':resolution/logosgde/201902121827_626ac523-b259-4108-b8a5-0d9531c66e95.png';
                isIfoodDelivery: true;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Italiana';
                name: 'Barolo Restaurante';
                supportsTracking: true;
                userRating: 4.489999771118164;
                isFavorite: false;
              },
              {
                id: '16dcf10b-7777-4a89-a2c5-9061412d94a2';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=16dcf10b-7777-4a89-a2c5-9061412d94a2&latitude=-18.9146624&longitude=-48.2132162&name=Tasty%20Pizza%20Express&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Ftasty-pizza-express-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 60;
                  timeMaxMinutes: 70;
                  deliveryMode: 'DEFAULT';
                };
                distance: 4.14;
                imageUrl: ':resolution/logosgde/16dcf10b-7777-4a89-a2c5-9061412d94a2/202101291027_bkHz_.jpeg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Pizza';
                name: 'Tasty Pizza Express';
                supportsTracking: false;
                userRating: 3.940000057220459;
                isFavorite: false;
              },
              {
                id: 'a885c114-da9c-400c-b7a9-5a111c9a4fbf';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=a885c114-da9c-400c-b7a9-5a111c9a4fbf&latitude=-18.9146624&longitude=-48.2132162&name=Round%20Pizza&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fround-pizza-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 60;
                  timeMaxMinutes: 70;
                  deliveryMode: 'DEFAULT';
                };
                distance: 4.14;
                imageUrl: ':resolution/logosgde/a885c114-da9c-400c-b7a9-5a111c9a4fbf/202209172048_PfVS_i.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Pizza';
                name: 'Round Pizza';
                supportsTracking: false;
                userRating: 3.9000000953674316;
                isFavorite: false;
              },
              {
                id: '6a2a46ce-4915-4004-86fe-c33a8d34c4bd';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=6a2a46ce-4915-4004-86fe-c33a8d34c4bd&latitude=-18.9146624&longitude=-48.2132162&name=Point%20Barolo&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fpoint-barolo-tibery&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 1399;
                  timeMinMinutes: 58;
                  timeMaxMinutes: 68;
                  deliveryMode: 'DEFAULT';
                };
                distance: 5;
                imageUrl: ':resolution/logosgde/201902130928_6a2a46ce-4915-4004-86fe-c33a8d34c4bd.jpg';
                isIfoodDelivery: true;
                isNew: false;
                isSuperRestaurant: true;
                mainCategory: 'Brasileira';
                name: 'Point Barolo';
                supportsTracking: true;
                userRating: 4.820000171661377;
                isFavorite: false;
              },
              {
                id: 'd2fd2738-c067-4243-ab5c-59ced31ca59e';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=d2fd2738-c067-4243-ab5c-59ced31ca59e&latitude=-18.9146624&longitude=-48.2132162&name=Pur%C3%AA%20Restaurante&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fpure-restaurante-saraiva&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 45;
                  timeMaxMinutes: 55;
                  deliveryMode: 'DEFAULT';
                };
                distance: 5.17;
                imageUrl: ':resolution/logosgde/d2fd2738-c067-4243-ab5c-59ced31ca59e/202006251603_FL6t_i.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Contemporânea';
                name: 'Purê Restaurante';
                supportsTracking: false;
                userRating: 4.239999771118164;
                isFavorite: false;
              },
              {
                id: '7b2b3492-95a2-4713-a5c1-920af43a5288';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=7b2b3492-95a2-4713-a5c1-920af43a5288&latitude=-18.9146624&longitude=-48.2132162&name=Mg%20World%20Suplementos%20Granada&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fmg-world-suplementos-granada-laranjeiras&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 1199;
                  timeMinMinutes: 47;
                  timeMaxMinutes: 57;
                  deliveryMode: 'DEFAULT';
                };
                distance: 5.26;
                imageUrl: ':resolution/logosgde/7b2b3492-95a2-4713-a5c1-920af43a5288/202307041151_FRrt_i.jpg';
                isIfoodDelivery: true;
                isNew: true;
                isSuperRestaurant: false;
                mainCategory: 'Saudável';
                name: 'Mg World Suplementos Granada';
                supportsTracking: true;
                userRating: 0;
                isFavorite: false;
              },
              {
                id: 'b68260d0-868f-4eeb-a429-81e0b8944bcb';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=b68260d0-868f-4eeb-a429-81e0b8944bcb&latitude=-18.9146624&longitude=-48.2132162&name=O%20Rei%20do%20Macarr%C3%A3o%20-%20Santa%20M%C3%B4nica&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fo-rei-do-macarrao---santa-monica-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 50;
                  timeMaxMinutes: 60;
                  deliveryMode: 'DEFAULT';
                };
                distance: 2.49;
                imageUrl: ':resolution/logosgde/b68260d0-868f-4eeb-a429-81e0b8944bcb/202112102241_fbJC_.jpeg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Italiana';
                name: 'O Rei do Macarrão - Santa Mônica';
                supportsTracking: false;
                userRating: 4.5;
                isFavorite: false;
              },
              {
                id: '16e89d97-c3af-4ac9-9e35-008e5f7dbfcc';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=16e89d97-c3af-4ac9-9e35-008e5f7dbfcc&latitude=-18.9146624&longitude=-48.2132162&name=Bonelle%20-%20Carnes%2C%20Massas%20e%20Grelhados&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fbonelle---carnes-massas-e-grelhados-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 24;
                  timeMaxMinutes: 34;
                  deliveryMode: 'DEFAULT';
                };
                distance: 2.98;
                imageUrl: ':resolution/logosgde/16e89d97-c3af-4ac9-9e35-008e5f7dbfcc/202104032352_QfCY_i.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Brasileira';
                name: 'Bonelle - Carnes, Massas e Grelhados';
                supportsTracking: false;
                userRating: 4.340000152587891;
                isFavorite: false;
              },
              {
                id: 'be742be5-e70e-4f08-988f-b80384af071c';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=be742be5-e70e-4f08-988f-b80384af071c&latitude=-18.9146624&longitude=-48.2132162&name=A%C3%A7a%C3%AD%20e%20Restaurante%20Nauan%20Ba%C3%AD&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Facai-e-restaurante-nauan-bai-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 50;
                  timeMaxMinutes: 60;
                  deliveryMode: 'DEFAULT';
                };
                distance: 3.67;
                imageUrl: ':resolution/logosgde/201807301057_be742be5-e70e-4f08-988f-b80384af071c.png';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Marmita';
                name: 'Açaí e Restaurante Nauan Baí';
                supportsTracking: false;
                userRating: 4.559999942779541;
                isFavorite: false;
              },
              {
                id: '8a83ef0c-4c96-4022-b09e-0fe59c24224f';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=8a83ef0c-4c96-4022-b09e-0fe59c24224f&latitude=-18.9146624&longitude=-48.2132162&name=Don%20Burgueria&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fdon-burgueria-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 40;
                  timeMaxMinutes: 50;
                  deliveryMode: 'DEFAULT';
                };
                distance: 3.64;
                imageUrl: ':resolution/logosgde/8a83ef0c-4c96-4022-b09e-0fe59c24224f/202307071409_hO6B_i.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: true;
                mainCategory: 'Lanches';
                name: 'Don Burgueria';
                supportsTracking: false;
                userRating: 4.710000038146973;
                isFavorite: false;
              },
              {
                id: 'db047c45-4231-46fa-a590-54ba3ac6830c';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=db047c45-4231-46fa-a590-54ba3ac6830c&latitude=-18.9146624&longitude=-48.2132162&name=Crunchy%20Pizza%20Express&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fcrunchy-pizza-express-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 60;
                  timeMaxMinutes: 70;
                  deliveryMode: 'DEFAULT';
                };
                distance: 4.14;
                imageUrl: ':resolution/logosgde/db047c45-4231-46fa-a590-54ba3ac6830c/201902072339_crun.jpeg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Pizza';
                name: 'Crunchy Pizza Express';
                supportsTracking: false;
                userRating: 4.309999942779541;
                isFavorite: false;
              },
              {
                id: '2cace795-0266-45b3-9a1f-908475db02b1';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=2cace795-0266-45b3-9a1f-908475db02b1&latitude=-18.9146624&longitude=-48.2132162&name=Punch%20Smash%20Burger%20Patio%20Sabia&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Fpunch-smash-burger-patio-sabia-tibery&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 999;
                  timeMinMinutes: 30;
                  timeMaxMinutes: 40;
                  deliveryMode: 'DEFAULT';
                };
                distance: 3.77;
                imageUrl: ':resolution/logosgde/2cace795-0266-45b3-9a1f-908475db02b1/202204152055_IROD_i.jpg';
                isIfoodDelivery: true;
                isNew: false;
                isSuperRestaurant: true;
                mainCategory: 'Lanches';
                name: 'Punch Smash Burger Patio Sabia';
                supportsTracking: true;
                userRating: 4.920000076293945;
                isFavorite: false;
              },
              {
                id: '5e1fd266-a490-4662-b094-a574a986b805';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=5e1fd266-a490-4662-b094-a574a986b805&latitude=-18.9146624&longitude=-48.2132162&name=Est%C3%A2ncia%20do%20Cupim&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Festancia-do-cupim-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 999;
                  timeMinMinutes: 31;
                  timeMaxMinutes: 41;
                  deliveryMode: 'DEFAULT';
                };
                distance: 3.04;
                imageUrl: ':resolution/logosgde/201810151746_5e1fd266-a490-4662-b094-a574a986b805.jpg';
                isIfoodDelivery: true;
                isNew: false;
                isSuperRestaurant: true;
                mainCategory: 'Carnes';
                name: 'Estância do Cupim';
                supportsTracking: true;
                userRating: 4.78000020980835;
                isFavorite: false;
              },
              {
                id: '1713e5b2-f07e-4e60-8add-1e50a9888c5e';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=1713e5b2-f07e-4e60-8add-1e50a9888c5e&latitude=-18.9146624&longitude=-48.2132162&name=A%C3%A7a%C3%AD%20Online%20Santa%20M%C3%B4nica&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Facai-online-santa-monica-segismundo-pereira&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 35;
                  timeMaxMinutes: 45;
                  deliveryMode: 'DEFAULT';
                };
                distance: 2.21;
                imageUrl: ':resolution/logosgde/1713e5b2-f07e-4e60-8add-1e50a9888c5e/202008241626_s36l_.jpeg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: true;
                mainCategory: 'Açaí';
                name: 'Açaí Online Santa Mônica';
                supportsTracking: false;
                userRating: 4.730000019073486;
                isFavorite: false;
              },
              {
                id: 'f9923459-0df4-409a-90b0-d4210491f63f';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=f9923459-0df4-409a-90b0-d4210491f63f&latitude=-18.9146624&longitude=-48.2132162&name=Time%20Restaurante&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Ftime-restaurante-santa-monica&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 35;
                  timeMaxMinutes: 45;
                  deliveryMode: 'DEFAULT';
                };
                distance: 2.54;
                imageUrl: ':resolution/logosgde/f9923459-0df4-409a-90b0-d4210491f63f/201904262118_8Zix_l.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Marmita';
                name: 'Time Restaurante';
                supportsTracking: false;
                userRating: 4.489999771118164;
                isFavorite: false;
              },
              {
                id: '9b0531e1-6c02-4bd5-ad50-0657c7bacf87';
                action: 'merchant?alias=HOME_MULTICATEGORY&channel=IFOOD&identifier=9b0531e1-6c02-4bd5-ad50-0657c7bacf87&latitude=-18.9146624&longitude=-48.2132162&name=Restaurante%20Integra%C3%A7%C3%A3o&remove_reserved_positions=false&size=20&slug=uberlandia-mg%2Frestaurante-integracao-dom-almir&super_categories_in=RESTAURANT';
                adsMetadata: null;
                available: true;
                currency: 'BRL';
                deliveryInfo: {
                  type: 'DELIVERY';
                  fee: 0;
                  timeMinMinutes: 35;
                  timeMaxMinutes: 45;
                  deliveryMode: 'DEFAULT';
                };
                distance: 0.95;
                imageUrl: ':resolution/logosgde/9b0531e1-6c02-4bd5-ad50-0657c7bacf87/202210131109_Oijw_i.jpg';
                isIfoodDelivery: false;
                isNew: false;
                isSuperRestaurant: false;
                mainCategory: 'Marmita';
                name: 'Restaurante Integração';
                supportsTracking: false;
                userRating: 4.090000152587891;
                isFavorite: false;
              },
            ];
            header: {
              title: 'Lojas';
            };
          };
          discardedSegments: null;
        },
        {
          id: 'c4a3b4e3-eda6-4228-9ec6-5736a9c7ba89';
          cardType: 'NEXT_CONTENT';
          data: {
            action: 'card-content?cursor=BHBzAMzHoeYNAMa79pwRAKak2uAVAIrYqKUQAMbwtrsWANyf67sTAIq8ovcaAI7wgdcdAAIAKAI=';
            lazy: false;
          };
          discardedSegments: null;
        },
      ];
    },
  ];
};

export const useHomeStore = defineStore('home', () => {
  /* state */
  const home = ref<Home | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  /* getters */

  /* actions */
  const fetch = async (): Promise<void> => {
    loading.value = true;
    try {
      await timeout(500);
      home.value = null;
    } catch (e: any) {
      error.value = e.toString();
      home.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    /* state */
    home,
    loading,
    error,

    /* getters */

    /* actions */
    fetch,
  };
});
