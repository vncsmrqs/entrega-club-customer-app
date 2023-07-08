import { v4 as uuid } from 'uuid';

export function debounce<T extends Function>(cb: T, wait = 20) {
  let h: any = 0;
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}

export const formatToCurrency = (value: number): string => {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return currencyFormatter.format(value);
};

export const generateId = (): string => uuid();
