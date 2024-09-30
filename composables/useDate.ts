// import { useDateFormat } from '@vueuse/core';
// export default (val: string) => {
//     return useDateFormat(val, 'DD-MM-YYYY hh:mm:ss a');
// };

export const useDate = () => {
    return {
        dformat: (val: string) => useDateFormat(val, 'DD-MM-YYYY hh:mm:ss a')
    };
};
