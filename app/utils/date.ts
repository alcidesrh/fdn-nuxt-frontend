// import dayjs from 'dayjs';

export const dayjs = useDayjs()
export const dformat = (val: string) => useDateFormat(val, 'DD/MM/YYYY hh:mm:ss a')
export const month_day_hour_format = (val: string) => dayjs(val).format('hh:mm:ss a') // useDateFormat(val, 'DD/MMMM hh:mm:ss a');
