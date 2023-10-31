export type PaymentOptionsType = 'ONLINE' | 'OFFLINE';

export type PaymentMethod =
  | 'PIX'
  | 'DEBIT'
  | 'CREDIT'
  | 'DIGITAL_WALLET'
  | 'CASH'
  | 'MEAL_VOUCHER' // Vale-refeição
  | 'FOOD_VOUCHER'; // Vale-alimentação

export type PaymentMethodBrand = {
  id: string; //'ed4f2cee-a87d-4659-9b0b-c37b854c99eb'
  name: string; //'DINERS'
  description: string; // 'Diners';
  imageUrl?: string;
  regex?: string; //'^3(?:0[0-5]|[68][0-9])[0-9]{11}$'
  cvv_regex?: string; //'^[0-9]{3}$';
};

export type PaymentLiability = 'APP' | 'MERCHANT';
