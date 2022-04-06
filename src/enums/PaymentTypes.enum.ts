export enum PAYMENT_TYPES_ENUM {
  MONEY = 'money',
  CARD_DEBIT = 'debit',
  CARD_CREDIT = 'credit',
  PIX = 'pix',
}

export enum STATUS_TRANSACTION_ENUM {
  PROGRESS = 'progress',
  FINISHED = 'finished',
  CANCELED = 'canceled',
  REFUNDS = 'refunds',
}

export enum STATUS_EVENTS_TRANSACTIONS_ENUM {
  PAYMENT = 'payment',
  REFUND = 'refund',
  PARTIAL = 'partial',
  CREATE = 'create',
}
