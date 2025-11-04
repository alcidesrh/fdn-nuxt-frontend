import { green, Log, yellow } from '@kitql/helpers';

export const logSQL = new Log('SQL');

export const cl = (...data) => {
	logSQL.info(...data);
};

export const cle = (...data) => {
	logSQL.error(...data);
};
export const cls = (...data) => {
	logSQL.success(...data);
};
