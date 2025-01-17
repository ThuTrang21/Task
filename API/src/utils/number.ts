// import { isEmpty, isNil, isNumber, toNumber, trim } from 'lodash';

// export const formatNumber = (
//   n?: number,
//   options?: {
//     suffix?: string;
//     prefix?: string;
//     minimumFractionDigits?: number;
//     maximumFractionDigits?: number;
//   },
// ): string => {
//   if (isNil(n)) return '';

//   const {
//     suffix = '',
//     prefix = '',
//     minimumFractionDigits = 0,
//     maximumFractionDigits = 0,
//   } = options || {};

//   let result = '';

//   if (isNumber(n))
//     result = n.toLocaleString('vi-VN', {
//       minimumFractionDigits,
//       maximumFractionDigits,
//     });

//   return trim(`${prefix}${result}${suffix}`);
// };

// export const parseNumber = (n?: string): number => {
//   if (isEmpty(n)) return 0;

//   const result = toNumber(n);

//   return isNaN(result) ? 0 : result;
// };
