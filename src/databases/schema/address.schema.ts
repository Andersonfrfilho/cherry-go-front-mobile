import { tableSchema } from '@nozbe/watermelondb';

const addressSchema = tableSchema({
  name: 'addresses',

  columns: [
    {
      name: 'external_id',
      type: 'string',
    },
    {
      name: 'street',
      type: 'string',
    },
    {
      name: 'number',
      type: 'string',
    },
    {
      name: 'zipcode',
      type: 'string',
    },
    {
      name: 'district',
      type: 'string',
    },
    {
      name: 'city',
      type: 'string',
    },
    {
      name: 'state',
      type: 'string',
    },
    {
      name: 'country',
      type: 'string',
    },
    {
      name: 'longitude',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'latitude',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'complement',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'complement',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'reference',
      type: 'string',
      isOptional: true,
    },
  ],
});

export { addressSchema };
