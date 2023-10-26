import type { Merchant } from '@/stores/merchant/merchant';
import { merchantFixture } from '@/stores/merchant/merchant';
import { timeout } from '@/utils';

export type GetMerchantByIdParams = {
  merchantId: string;
};

export const getMerchantById = async ({
  merchantId,
}: GetMerchantByIdParams): Promise<Merchant> => {
  console.log('REQUEST::getMerchantById', { merchantId });
  await timeout(3000);
  return merchantFixture();
};
