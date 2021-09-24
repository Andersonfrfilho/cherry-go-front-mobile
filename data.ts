export default {
  user: {
    id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
    name: 'johnson',
    last_name: 'howell',
    cpf: '51363406437',
    rg: '85065778',
    email: 'timothy_oreilly74@gmail.com',
    gender: 'FEMALE',
    details: null,
    active: true,
    phones: [
      {
        id: '36845a39-d200-453d-8288-c2e8cad35ba0',
        country_code: '+39',
        ddd: '81',
        number: '993208537',
      },
    ],
    addresses: [
      {
        id: 'cf2938b1-2986-461c-ab8e-5537c67d0157',
        street: 'Blick Springs',
        number: '9162',
        zipcode: '04123086',
        longitude: '50.612852',
        latitude: '47.394648',
        district: 'Apt. 236',
        city: 'Kirlinburgh',
        state: 'Delaware',
        country: 'puerto rico',
        complement: null,
        reference: null,
      },
    ],
    image_profile: [
      {
        id: '25c977f5-7cf9-4040-8855-b3e1b6f3fba4',
        user_id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
        image_id: '5bf2f285-b90f-45e6-b11a-8fb424f614b3',
        created_at: '2021-09-18T18:21:40.232Z',
        updated_at: null,
        deleted_at: null,
        image: {
          id: '5bf2f285-b90f-45e6-b11a-8fb424f614b3',
          link: 'https://cdn.fakercloud.com/avatars/joemdesign_128.jpg',
        },
      },
    ],
    types: [
      {
        id: 'f6382481-3f00-4d4c-9839-32514800213b',
        user_id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
        user_type_id: '140e601a-01eb-477f-960d-75734694da73',
        active: true,
        roles: [],
        permissions: [],
        user_type: {
          id: '140e601a-01eb-477f-960d-75734694da73',
          name: 'client',
          description: null,
        },
      },
    ],
    term: [
      {
        id: 'ff698b9f-6d52-445e-a0ba-528f536280cf',
        accept: true,
        type: 'client',
      },
    ],
    transactions: [
      {
        id: 'b38efbb2-4f71-4466-aa44-20254dca8e97',
        current_amount: '25572',
        original_amount: '29370',
        discount_amount: '6267',
        increment_amount: '2469',
        status: 'progress',
        client_id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
        appointment_id: '68839499-5d52-470c-a7e6-4d3e59ddc1ad',
        created_at: '2021-09-18T18:21:41.877Z',
        updated_at: '2021-09-18T18:21:42.100Z',
        deleted_at: null,
        itens: [
          {
            id: '599e242a-09cb-4447-bdb1-bf6f61cc0524',
            transaction_id: 'b38efbb2-4f71-4466-aa44-20254dca8e97',
            elements: {
              id: 'a9d2eb90-1ac4-40cc-89be-c19a030e1ef6',
              service: {
                id: 'c2d2fee1-9d0f-4686-8bcb-efc73cd065e9',
                name: 'Central Functionality Liaison',
                active: true,
                amount: '29370',
                duration: '75126',
                created_at: '2021-09-18T18:21:40.368Z',
                deleted_at: null,
                updated_at: null,
                provider_id: 'cb35c061-947b-43ad-8c8d-5cf057dfbfca',
              },
              created_at: '2021-09-18T18:21:41.740Z',
              deleted_at: null,
              service_id: 'c2d2fee1-9d0f-4686-8bcb-efc73cd065e9',
              updated_at: null,
              provider_id: 'cb35c061-947b-43ad-8c8d-5cf057dfbfca',
              appointment_id: '68839499-5d52-470c-a7e6-4d3e59ddc1ad',
            },
            reference_key: 'a9d2eb90-1ac4-40cc-89be-c19a030e1ef6',
            type: 'service',
            increment_amount: '2469',
            discount_amount: '6267',
            amount: '29370',
            created_at: '2021-09-18T18:21:41.931Z',
            updated_at: null,
            deleted_at: null,
          },
        ],
      },
      {
        id: '1a9c4090-98a0-45d6-a069-40fe48432bea',
        current_amount: '41018',
        original_amount: '39643',
        discount_amount: '1900',
        increment_amount: '3275',
        status: 'progress',
        client_id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
        appointment_id: '7193ccd9-734d-417e-ad72-878455b01959',
        created_at: '2021-09-18T18:21:41.877Z',
        updated_at: '2021-09-18T18:21:42.100Z',
        deleted_at: null,
        itens: [
          {
            id: 'a8b59126-bc3e-4bf7-90e7-11f1328bfad0',
            transaction_id: '1a9c4090-98a0-45d6-a069-40fe48432bea',
            elements: {
              id: '0fe8bd97-64ec-4d21-9d23-3ee099f9df38',
              service: {
                id: '354f7ad9-43ae-4d37-a0dd-dff9cb528801',
                name: 'Investor Accounts Orchestrator',
                active: false,
                amount: '39643',
                duration: '85655',
                created_at: '2021-09-18T18:21:40.368Z',
                deleted_at: null,
                updated_at: null,
                provider_id: 'dddcefb2-b522-4f82-966e-ec5b8848ae09',
              },
              created_at: '2021-09-18T18:21:41.740Z',
              deleted_at: null,
              service_id: '354f7ad9-43ae-4d37-a0dd-dff9cb528801',
              updated_at: null,
              provider_id: 'dddcefb2-b522-4f82-966e-ec5b8848ae09',
              appointment_id: '7193ccd9-734d-417e-ad72-878455b01959',
            },
            reference_key: '0fe8bd97-64ec-4d21-9d23-3ee099f9df38',
            type: 'service',
            increment_amount: '3275',
            discount_amount: '1900',
            amount: '39643',
            created_at: '2021-09-18T18:21:41.931Z',
            updated_at: null,
            deleted_at: null,
          },
        ],
      },
      {
        id: 'daaac6bb-3bfd-4b7a-bd3e-c6c63e0ae89f',
        current_amount: '7230',
        original_amount: '8148',
        discount_amount: '1040',
        increment_amount: '122',
        status: 'progress',
        client_id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
        appointment_id: '293b0150-4c9f-4850-acf9-a946ecd8d446',
        created_at: '2021-09-18T18:21:41.877Z',
        updated_at: '2021-09-18T18:21:42.100Z',
        deleted_at: null,
        itens: [
          {
            id: '2ac25453-4a54-4ae4-895f-21463364f881',
            transaction_id: 'daaac6bb-3bfd-4b7a-bd3e-c6c63e0ae89f',
            elements: {
              id: 'e3e040ae-b9ce-4572-8c0c-98f946576a5b',
              service: {
                id: 'f21f5b9a-818f-4e32-9e75-294ffedd316e',
                name: 'Corporate Quality Representative',
                active: false,
                amount: '8148',
                duration: '35911',
                created_at: '2021-09-18T18:21:40.368Z',
                deleted_at: null,
                updated_at: null,
                provider_id: 'adef8a69-f4f2-45f5-a7db-66f7e3678adf',
              },
              created_at: '2021-09-18T18:21:41.740Z',
              deleted_at: null,
              service_id: 'f21f5b9a-818f-4e32-9e75-294ffedd316e',
              updated_at: null,
              provider_id: 'adef8a69-f4f2-45f5-a7db-66f7e3678adf',
              appointment_id: '293b0150-4c9f-4850-acf9-a946ecd8d446',
            },
            reference_key: 'e3e040ae-b9ce-4572-8c0c-98f946576a5b',
            type: 'service',
            increment_amount: '122',
            discount_amount: '1040',
            amount: '8148',
            created_at: '2021-09-18T18:21:41.931Z',
            updated_at: null,
            deleted_at: null,
          },
        ],
      },
      {
        id: '157a342c-86e8-4d49-be2b-da5586dc7541',
        current_amount: '22808',
        original_amount: '27295',
        discount_amount: '4907',
        increment_amount: '420',
        status: 'progress',
        client_id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
        appointment_id: '7d95a160-9bd9-49a5-bda0-b39e69a05305',
        created_at: '2021-09-18T18:21:41.877Z',
        updated_at: '2021-09-18T18:21:42.100Z',
        deleted_at: null,
        itens: [
          {
            id: '4c39e82b-26f7-4b14-807e-bd504e2dd436',
            transaction_id: '157a342c-86e8-4d49-be2b-da5586dc7541',
            elements: {
              id: '954c1954-493f-4d17-85b1-cd8e4a6b997f',
              service: {
                id: '13b29360-5bca-4079-99ba-f3aa7b00c952',
                name: 'Investor Group Representative',
                active: true,
                amount: '27295',
                duration: '60086',
                created_at: '2021-09-18T18:21:40.368Z',
                deleted_at: null,
                updated_at: null,
                provider_id: 'c7e56b38-1112-494e-8b6f-70ddaa78803c',
              },
              created_at: '2021-09-18T18:21:41.740Z',
              deleted_at: null,
              service_id: '13b29360-5bca-4079-99ba-f3aa7b00c952',
              updated_at: null,
              provider_id: 'c7e56b38-1112-494e-8b6f-70ddaa78803c',
              appointment_id: '7d95a160-9bd9-49a5-bda0-b39e69a05305',
            },
            reference_key: '954c1954-493f-4d17-85b1-cd8e4a6b997f',
            type: 'service',
            increment_amount: '420',
            discount_amount: '4907',
            amount: '27295',
            created_at: '2021-09-18T18:21:41.931Z',
            updated_at: null,
            deleted_at: null,
          },
        ],
      },
      {
        id: '9577b00b-987d-4f63-afa3-693f0b6ff921',
        current_amount: '71761',
        original_amount: '89868',
        discount_amount: '21113',
        increment_amount: '3006',
        status: 'progress',
        client_id: '0f2544aa-d234-4dba-bd2d-d4f7166646c1',
        appointment_id: '8347249c-586e-411c-92c5-a7a3f796b596',
        created_at: '2021-09-18T18:21:41.877Z',
        updated_at: '2021-09-18T18:21:42.100Z',
        deleted_at: null,
        itens: [
          {
            id: '70504f62-d2c7-4776-9785-4a3416b096fe',
            transaction_id: '9577b00b-987d-4f63-afa3-693f0b6ff921',
            elements: {
              id: 'd12a67be-5fca-4570-acc9-202644ff8d9d',
              service: {
                id: 'ff391ff9-3917-4274-978c-4dfd179d61a9',
                name: 'Forward Configuration Architect',
                active: false,
                amount: '89868',
                duration: '18049',
                created_at: '2021-09-18T18:21:40.368Z',
                deleted_at: null,
                updated_at: null,
                provider_id: '7230d996-d506-45f8-8531-7d6a2fc6455e',
              },
              created_at: '2021-09-18T18:21:41.740Z',
              deleted_at: null,
              service_id: 'ff391ff9-3917-4274-978c-4dfd179d61a9',
              updated_at: null,
              provider_id: '7230d996-d506-45f8-8531-7d6a2fc6455e',
              appointment_id: '8347249c-586e-411c-92c5-a7a3f796b596',
            },
            reference_key: 'd12a67be-5fca-4570-acc9-202644ff8d9d',
            type: 'service',
            increment_amount: '3006',
            discount_amount: '21113',
            amount: '89868',
            created_at: '2021-09-18T18:21:41.931Z',
            updated_at: null,
            deleted_at: null,
          },
        ],
      },
    ],
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIxODk2MzYsImV4cCI6MTYzMjE5MDUzNiwic3ViIjoie1widXNlclwiOntcImlkXCI6XCIwZjI1NDRhYS1kMjM0LTRkYmEtYmQyZC1kNGY3MTY2NjQ2YzFcIixcImFjdGl2ZVwiOnRydWUsXCJ0eXBlc1wiOlt7XCJpZFwiOlwiZjYzODI0ODEtM2YwMC00ZDRjLTk4MzktMzI1MTQ4MDAyMTNiXCIsXCJ1c2VyX2lkXCI6XCIwZjI1NDRhYS1kMjM0LTRkYmEtYmQyZC1kNGY3MTY2NjQ2YzFcIixcInVzZXJfdHlwZV9pZFwiOlwiMTQwZTYwMWEtMDFlYi00NzdmLTk2MGQtNzU3MzQ2OTRkYTczXCIsXCJhY3RpdmVcIjp0cnVlLFwicm9sZXNcIjpbXSxcInBlcm1pc3Npb25zXCI6W10sXCJjcmVhdGVkX2F0XCI6XCIyMDIxLTA5LTE4VDE4OjIxOjM5Ljc0MlpcIixcInVwZGF0ZWRfYXRcIjpudWxsLFwiZGVsZXRlZF9hdFwiOm51bGwsXCJ1c2VyX3R5cGVcIjp7XCJpZFwiOlwiMTQwZTYwMWEtMDFlYi00NzdmLTk2MGQtNzU3MzQ2OTRkYTczXCIsXCJuYW1lXCI6XCJjbGllbnRcIixcImRlc2NyaXB0aW9uXCI6bnVsbCxcImFjdGl2ZVwiOnRydWUsXCJjcmVhdGVkX2F0XCI6XCIyMDIxLTA5LTE4VDE4OjIxOjA4LjY0NVpcIixcInVwZGF0ZWRfYXRcIjpudWxsLFwiZGVsZXRlZF9hdFwiOm51bGx9fV19fSJ9.0aLZyzduZiXl_NASfA-UVesu-OPvR2xF6EXlhepOBv4',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpbW90aHlfb3JlaWxseTc0QGdtYWlsLmNvbSIsImlhdCI6MTYzMjE4OTYzNiwiZXhwIjoxNjM0NzgxNjM2LCJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcIjBmMjU0NGFhLWQyMzQtNGRiYS1iZDJkLWQ0ZjcxNjY2NDZjMVwiLFwiYWN0aXZlXCI6dHJ1ZSxcInR5cGVzXCI6W3tcImlkXCI6XCJmNjM4MjQ4MS0zZjAwLTRkNGMtOTgzOS0zMjUxNDgwMDIxM2JcIixcInVzZXJfaWRcIjpcIjBmMjU0NGFhLWQyMzQtNGRiYS1iZDJkLWQ0ZjcxNjY2NDZjMVwiLFwidXNlcl90eXBlX2lkXCI6XCIxNDBlNjAxYS0wMWViLTQ3N2YtOTYwZC03NTczNDY5NGRhNzNcIixcImFjdGl2ZVwiOnRydWUsXCJyb2xlc1wiOltdLFwicGVybWlzc2lvbnNcIjpbXSxcImNyZWF0ZWRfYXRcIjpcIjIwMjEtMDktMThUMTg6MjE6MzkuNzQyWlwiLFwidXBkYXRlZF9hdFwiOm51bGwsXCJkZWxldGVkX2F0XCI6bnVsbCxcInVzZXJfdHlwZVwiOntcImlkXCI6XCIxNDBlNjAxYS0wMWViLTQ3N2YtOTYwZC03NTczNDY5NGRhNzNcIixcIm5hbWVcIjpcImNsaWVudFwiLFwiZGVzY3JpcHRpb25cIjpudWxsLFwiYWN0aXZlXCI6dHJ1ZSxcImNyZWF0ZWRfYXRcIjpcIjIwMjEtMDktMThUMTg6MjE6MDguNjQ1WlwiLFwidXBkYXRlZF9hdFwiOm51bGwsXCJkZWxldGVkX2F0XCI6bnVsbH19XX19In0.pCXzTOv-tUfkW7KQXvNZgZtc_IEynlQKUEZCxUeoPrg',
};
