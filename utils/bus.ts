import { ApolloError } from '@apollo/client/errors';

export const msg = useEventBus('msg');

const error = useEventBus('error');

export const merror = (msg: ApolloError | string) => error.emit(msg);

export const msgbus = (b) => {
    return useEventBus(b);
};
